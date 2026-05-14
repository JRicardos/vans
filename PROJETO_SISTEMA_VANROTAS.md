# VanRotas - Projeto do Sistema

Documento adaptado do canvas de arquitetura do sistema.

Este documento consolida a proposta de sistema para o **VanRotas**, uma plataforma SaaS multitenant para operadores de transporte escolar e fretado. A solucao cobre confirmacao diaria de presenca, lista otimizada para o motorista, pagamentos recorrentes, rastreamento ao vivo e gestao operacional.

---

## 1. Visao geral

Arquitetura proposta a partir do PRD:

- SaaS multitenant.
- Operacao de vans escolares e fretadas.
- Confirmacao diaria de presenca.
- Pagamento recorrente e avulso.
- Rota otimizada apos horario de corte.
- Rastreamento ao vivo durante corrida ativa.
- Painel administrativo para operador.
- Base para painel de super admin.

Indicadores do projeto:

| Item | Quantidade |
|---|---:|
| Perfis de usuario | 4 |
| Dominios principais | 6 |
| Fluxos criticos | 5 |
| Roadmap inicial | 22 semanas |

---

## 2. Decisao arquitetural inicial

Comecar com um backend **Express modular em um unico servico**, usando Postgres como fonte de verdade.

Principios:

- Backend em Node.js + Express.
- Modulos internos bem separados.
- Postgres/Supabase como banco principal.
- RLS obrigatoria por tenant.
- Middleware para validar usuario, role e tenant.
- Workers internos para jobs agendados.
- Webhooks com idempotencia.
- Separar em microsservicos apenas quando houver necessidade real de escala ou times independentes.

---

## 3. Arquitetura logica

### 3.1 Clientes

Interfaces separadas por contexto de uso:

- Web admin React/Vercel.
- App Capacitor.
- Motorista.
- Passageiro.

### 3.2 API VanRotas

Borda de negocio, autorizacao por role e orquestracao dos fluxos:

- Express.
- REST.
- Middlewares.
- Workers.
- Webhook receiver.

### 3.3 Dados e realtime

Persistencia transacional, autenticacao e canais de localizacao:

- Supabase Auth.
- Postgres + RLS.
- Supabase Realtime.
- Supabase Storage.

### 3.4 Pagamentos

Recorrencia, Pix, boleto, split e webhooks idempotentes:

- Asaas customers.
- Charges.
- Subscriptions.
- Split.

### 3.5 Mapas

Otimizacao pos-corte e estimativas de chegada:

- Google Directions.
- Waypoints.
- ETA snapshots.

### 3.6 Mensageria

Eventos de produto convertidos em push, e-mail e avisos in-app:

- FCM.
- APNs.
- E-mail.
- In-app inbox.

---

## 4. Dominios e responsabilidades

| Dominio | Responsabilidade | Entidades principais |
|---|---|---|
| Identidade e tenants | Onboarding, roles, isolamento e planos SaaS. | `tenant`, `tenant_user`, `subscription_plan`, `role_assignment` |
| Operacao | Frota, motoristas, rotas, pontos, passageiros e confirmacoes. | `van`, `driver_profile`, `route`, `route_stop`, `passenger_profile`, `attendance_confirmation` |
| Corridas | Geracao da lista diaria, estado da corrida, embarques e ausencias. | `trip`, `trip_stop`, `boarding_event`, `optimized_route_snapshot` |
| Financeiro | Clientes Asaas, recorrencias, cobrancas avulsas, split e inadimplencia. | `billing_customer`, `charge`, `payment_event`, `driver_payout_rule` |
| Realtime e mapas | Localizacao da van, ETA, otimizacao de waypoints e notificacao por proximidade. | `vehicle_location`, `eta_snapshot`, `route_optimization_job` |
| Notificacoes | Push, e-mail, in-app, templates e auditoria de envio. | `notification`, `device_token`, `notification_template`, `delivery_log` |

---

## 5. Modelo de dados inicial

### 5.1 Tenant como chave de isolamento

Toda tabela de negocio deve carregar `tenant_id`.

Regras:

- Toda query deve filtrar por `tenant_id`.
- O `tenant_id` deve ser validado no middleware da API.
- O banco deve reforcar o isolamento com RLS.
- Nenhum endpoint deve confiar em `tenant_id` enviado livremente pelo cliente.

### 5.2 Rotas versionadas por corrida

A rota planejada pode mudar com o tempo, mas cada corrida deve salvar um snapshot.

Motivo:

- Permitir auditoria.
- Permitir historico do dia.
- Preservar a rota usada na corrida mesmo que a rota principal seja editada depois.

Entidades relacionadas:

- `route`
- `route_stop`
- `trip`
- `trip_stop`
- `optimized_route_snapshot`

### 5.3 Financeiro orientado a eventos

Webhooks Asaas devem ser gravados como eventos brutos antes de alterar entidades financeiras.

Motivo:

- Auditoria.
- Reprocessamento.
- Idempotencia.
- Investigacao de falhas.

Entidades relacionadas:

- `charge`
- `payment_event`
- `billing_customer`

### 5.4 Localizacao efemera

A posicao atual da van pode ser tratada como dado efemero.

Regras:

- Localizacao so existe durante corrida ativa.
- Ponto GPS atual pode ser realtime/TTL.
- Eventos relevantes da corrida devem ser persistidos.
- Fora da corrida ativa, nenhuma localizacao deve ser enviada.

---

## 6. Regras que viram invariantes

### RN-02 - Corte de confirmacao

Depois do horario de corte, a lista da `trip` nao deve mudar automaticamente.

Se houver ajuste manual, ele deve gerar uma nova versao auditada.

### RN-03 - Bloqueio por inadimplencia

A elegibilidade do passageiro e o status financeiro precisam ser calculados antes de montar a lista do motorista.

### RN-04 - Rastreamento por corrida ativa

Localizacao so existe com `trip` em estado ativo, iniciada explicitamente pelo motorista.

### RN-06 - Isolamento de tenant

Nenhum endpoint deve aceitar `tenant_id` arbitrario vindo do cliente sem cruzar com a sessao autenticada.

---

## 7. Fluxos assincronos

| Momento | Processamento | Evento | Saida |
|---|---|---|---|
| 18h: solicitar presenca | Scheduler cria notificacoes para passageiros ativos da rota. | `notification.created` | Push + in-app |
| Confirmacao diaria | Passageiro grava Vou/Nao vou antes do corte; avulso dispara cobranca. | `attendance.confirmed` | Asaas, se aplicavel |
| 22h: congelar rota | Job seleciona confirmados adimplentes, chama Directions API e salva snapshot. | `trip.route_locked` | Push para motorista |
| Corrida ativa | Motorista inicia corrida; app publica GPS a cada 8s em canal da corrida. | `trip.started` / `vehicle.location_updated` | Supabase Realtime |
| Pagamento confirmado | Webhook Asaas valida assinatura, idempotencia e atualiza status financeiro. | `payment.confirmed` | Libera passageiro |

---

## 8. APIs principais

### 8.1 Admin

Responsabilidades:

- CRUD de vans.
- CRUD de motoristas.
- CRUD de passageiros.
- CRUD de rotas.
- CRUD de pontos de parada.
- Configuracao de planos de passageiros.
- Financeiro consolidado.
- Exportacao CSV.

### 8.2 Motorista

Responsabilidades:

- Consultar lista da `trip` do dia.
- Iniciar corrida.
- Encerrar corrida.
- Marcar embarque.
- Marcar ausencia.
- Publicar localizacao ativa.

### 8.3 Passageiro

Responsabilidades:

- Confirmar presenca.
- Consultar pagamentos.
- Abrir link Asaas.
- Acompanhar van ativa.
- Ver historico de corridas.

---

## 9. Seguranca e operacao

### 9.1 Controles minimos para MVP

- RLS testada por role.
- `idempotency key` em webhooks.
- Logs de integracao.
- Rate limit nos endpoints publicos.
- Auditoria de mudancas financeiras.
- Alertas para falhas em jobs agendados.

### 9.2 Pontos de atencao

- Custos de Google Maps.
- Bateria do motorista com GPS ativo.
- Confiabilidade de push em background.
- Reconciliacao de pagamentos Asaas.
- Testes de isolamento entre tenants.

---

## 10. Roadmap tecnico

| Fase | Janela | Entrega tecnica |
|---|---|---|
| 1. Fundacao | Semanas 1-4 | Auth, tenants, RLS, CRUD principal, app base. |
| 2. Operacao diaria | Semanas 5-8 | Presenca, lista do motorista, embarque e historico. |
| 3. Financeiro | Semanas 9-12 | Asaas, webhooks, recorrencia, avulso, bloqueios e painel. |
| 4. Rotas | Semanas 13-15 | Directions API, waypoints, rota otimizada e ETA inicial. |
| 5. Ao vivo | Semanas 16-18 | GPS realtime, mapa do passageiro e alerta de proximidade. |
| 6. SaaS | Semanas 19-22 | Super admin, billing do operador, analytics e escala. |

---

## 11. Primeira entrega recomendada

Implementar a fundacao como um monorepo simples:

- Packages compartilhados de tipos e validacoes.
- Web admin.
- App Capacitor.
- API Express.

O primeiro marco deve provar:

- Login.
- Isolamento por tenant.
- CRUD de rotas.
- CRUD de passageiros.
- Criacao de uma `trip` diaria.

Nesse primeiro marco, pagamentos e mapas podem permanecer fora do escopo.
