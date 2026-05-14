# PRD — VanRotas
**Versão:** 1.0  
**Data:** Maio 2025  
**Status:** Em definição  

---

## 1. Visão geral do produto

VanRotas é uma plataforma SaaS multitenant para operadores de transporte escolar e fretado. Conecta administradores de frota, motoristas e passageiros em um único sistema que cobre operação diária, pagamentos recorrentes e rastreamento ao vivo.

**Proposta de valor central:** o passageiro confirma presença no app, o motorista recebe a rota otimizada com quem vai embarcar, e o pagamento acontece automaticamente — sem planilhas, sem cobranças manuais, sem chamada perdida.

---

## 2. Contexto e problema

Operadores de van escolar e fretado gerenciam listas de passageiros por WhatsApp, cobranças via Pix manual mês a mês, e não têm visibilidade de quem vai ou não no dia seguinte. Passageiros não sabem onde a van está. Motoristas percorrem rotas fixas mesmo quando metade dos passageiros faltou.

**Dores principais identificadas:**
- Cobrança manual e inadimplência sem rastreamento
- Motorista não sabe com antecedência quem vai embarcar
- Passageiro não sabe quando a van vai chegar
- Operador não tem relatório financeiro consolidado
- Gestão de múltiplas vans e rotas feita em planilhas

---

## 3. Objetivos do produto

| Objetivo | Métrica de sucesso |
|---|---|
| Eliminar cobrança manual | 100% das mensalidades via recorrência Asaas |
| Reduzir tempo ocioso do motorista | Rota otimizada baseada em confirmados do dia |
| Aumentar previsibilidade operacional | Taxa de confirmação antes do corte ≥ 80% |
| Oferecer visibilidade ao passageiro | App com posição da van ao vivo |
| Viabilizar escala SaaS | Onboarding de novo operador em < 30 min |

---

## 4. Público-alvo

**Operador de frota (tenant admin):** dono ou gestor de empresa de transporte escolar ou fretado, com 1–5 vans, 20–150 passageiros. Não necessariamente técnico. Precisa de painel simples e financeiro claro.

**Motorista:** opera o app durante a corrida. Precisa de interface extremamente simples — lista, mapa, botão de embarque. Não pode ser complexo ao volante.

**Passageiro:** pais de alunos ou trabalhadores fretados. Confirma presença no dia anterior, acompanha a van e recebe cobranças pelo app.

**Super admin (plataforma):** equipe interna que gerencia os tenants, monitora saúde do sistema e configura planos SaaS.

---

## 5. Modelo de negócio

### Monetização da plataforma (B2B)
- Assinatura mensal por operador, com planos por número de vans:
  - **Starter:** até 2 vans / 50 passageiros
  - **Pro:** até 10 vans / 300 passageiros
  - **Enterprise:** ilimitado + suporte dedicado

### Modelo financeiro do operador (B2C)
- **Mensalidade pré-paga:** passageiro paga no início do mês e tem direito a rodar o mês todo. Ausências não geram desconto ou crédito.
- **Avulso:** passageiro não mensalista paga por corrida. Cobrança gerada no momento da confirmação de presença.
- **Split automático:** o operador configura o percentual de repasse ao motorista por rota. O Asaas executa o split na liquidação.

---

## 6. Arquitetura de usuários e permissões

| Role | Escopo | Capacidades |
|---|---|---|
| `superadmin` | Toda a plataforma | Gerenciar tenants, planos, métricas globais |
| `tenant_admin` | Seu tenant | Vans, motoristas, passageiros, rotas, financeiro |
| `motorista` | Suas corridas | Lista do dia, rota no mapa, confirmar embarques, rastreamento |
| `passageiro` | Seus dados | Confirmar presença, pagar, rastrear van, histórico |

---

## 7. Funcionalidades por módulo

### 7.1 Módulo de administração (tenant admin)

**Gestão de frota**
- Cadastrar e editar vans (placa, modelo, capacidade, foto)
- Vincular van a motorista
- Ativar / desativar van

**Gestão de rotas**
- Criar rota com nome, horário de partida e horário de corte de confirmação
- Definir pontos de parada com endereço ou coordenadas GPS
- Vincular rota a uma van
- Configurar percentual de repasse ao motorista

**Gestão de passageiros**
- Cadastrar passageiro (nome, endereço de embarque, contato, responsável)
- Vincular passageiro a uma rota
- Definir plano: mensalista ou avulso
- Visualizar status financeiro do passageiro (adimplente / inadimplente)

**Painel financeiro**
- Receita do mês por rota e por van
- Status de cobranças (pagas, pendentes, vencidas)
- Repasses realizados aos motoristas
- Exportação de relatório em CSV

### 7.2 Módulo do motorista

**Tela principal — lista do dia**
- Exibe passageiros confirmados para a corrida do dia
- Ordenados pela sequência otimizada de embarque
- Nome, foto (opcional) e endereço de cada passageiro

**Mapa de rota otimizada**
- Exibe trajeto calculado com waypoints dos confirmados
- Navegação integrada (abre Google Maps ou Waze com a rota)
- Estimativa de tempo por parada

**Confirmação de embarque**
- Motorista marca cada passageiro como "embarcou" ao passar pelo ponto
- Passageiro que não embarcou pode ser marcado como ausente
- Registro salvo com timestamp

**Rastreamento ativo**
- Ao iniciar a corrida, o app envia posição GPS a cada 8 segundos via Supabase Realtime
- Motorista encerra a corrida explicitamente — rastreamento para

### 7.3 Módulo do passageiro

**Confirmação de presença**
- Notificação push às 18h: "Confirme sua presença de amanhã"
- App exibe botão "Vou" / "Não vou"
- Horário de corte configurável pelo operador (padrão: 22h)
- Passageiros sem resposta até o corte são marcados como ausentes

**Pagamento**
- Mensalistas: cobrança recorrente gerada automaticamente no Asaas
- Avulsos: cobrança gerada ao confirmar "Vou", com vencimento em 1h
- Pagamento via Pix ou boleto dentro do app
- Passageiro inadimplente vê aviso e não aparece na lista do motorista

**Rastreamento da van**
- Quando a corrida está ativa, o passageiro vê a posição da van no mapa em tempo real
- ETA calculado com base na posição atual e endereço do passageiro
- Notificação push quando a van está a ≤ 2 paradas de distância

**Histórico**
- Listagem de corridas realizadas no mês
- Histórico de pagamentos com comprovantes

### 7.4 Módulo de notificações

| Evento | Destinatário | Canal |
|---|---|---|
| Confirmação de presença (18h) | Passageiro | Push + in-app |
| Lembrete de corte (21h30) | Passageiros sem resposta | Push |
| Rota do dia disponível | Motorista | Push |
| Cobrança gerada | Passageiro | Push + e-mail |
| Pagamento confirmado | Passageiro + admin | Push |
| Van a 2 paradas de distância | Passageiro | Push |
| Passageiro inadimplente | Admin | In-app |

---

## 8. Regras de negócio críticas

**RN-01 — Mensalidade pré-paga:**  
O passageiro mensalista paga no início do mês e tem direito a rodar todos os dias do mês. Faltas não geram desconto, crédito ou reembolso. A recorrência Asaas é gerada independentemente de presença.

**RN-02 — Corte de confirmação:**  
Após o horário de corte, a lista de confirmados é congelada e enviada para o algoritmo de roteamento. Nenhuma confirmação após o corte é considerada na rota do dia.

**RN-03 — Bloqueio por inadimplência:**  
Passageiro avulso com cobrança vencida há mais de 2h não aparece na lista do motorista e recebe aviso no app. Mensalistas inadimplentes são bloqueados a partir do 5º dia do mês seguinte.

**RN-04 — Rastreamento por corrida ativa:**  
A posição da van só é transmitida quando o motorista inicia explicitamente a corrida no app. Fora desse estado, nenhuma localização é enviada.

**RN-05 — Passageiro sem resposta:**  
Passageiro que não confirmar até o horário de corte é tratado como ausente. O operador pode configurar o comportamento padrão por rota (ausente ou presente).

**RN-06 — Isolamento de tenant:**  
Nenhuma query, relatório ou notificação pode cruzar dados entre tenants. O `tenant_id` é validado em toda requisição via middleware e RLS no banco.

**RN-07 — Split por rota:**  
O percentual de repasse ao motorista é configurado por rota, não por van nem por corrida. O Asaas realiza o split automaticamente na liquidação da cobrança.

---

## 9. Fluxos principais

### Fluxo de onboarding do operador
1. Operador acessa a plataforma e cria conta (cria tenant)
2. Configura dados da empresa e plano de assinatura
3. Cadastra vans e motoristas
4. Cria rotas com pontos de parada e horários
5. Cadastra passageiros e vincula a rotas
6. Define planos (mensalista / avulso) e valores
7. Sistema gera cobranças recorrentes no Asaas para mensalistas

### Fluxo de confirmação diária
1. 18h: push para todos os passageiros da rota
2. Passageiro abre app e confirma "Vou" ou "Não vou"
3. 21h30: lembrete push para quem ainda não respondeu
4. 22h (corte): lista de confirmados é congelada
5. Backend chama Google Maps Directions API com endereços dos confirmados
6. Rota otimizada é salva e push enviado ao motorista

### Fluxo da corrida (motorista)
1. Motorista abre app e vê lista do dia + mapa
2. Toca "Iniciar corrida" — rastreamento ativo começa
3. App do passageiro exibe van no mapa em tempo real
4. Ao chegar em cada ponto, motorista confirma embarque
5. Quando a van está a 2 paradas, push é enviado ao próximo passageiro
6. Ao fim da corrida, motorista toca "Encerrar" — rastreamento para

### Fluxo de pagamento (avulso)
1. Passageiro confirma "Vou"
2. Backend gera cobrança no Asaas
3. Push com link de pagamento enviado ao passageiro
4. Passageiro paga via Pix (vencimento: 1h antes da partida)
5. Webhook Asaas confirma pagamento → status atualizado → aparece na lista do motorista

---

## 10. Stack técnica

| Camada | Tecnologia |
|---|---|
| Frontend (app) | React + Capacitor (iOS + Android) |
| Backend | Node.js + Fastify |
| Banco de dados | Supabase (Postgres + RLS) |
| Realtime | Supabase Realtime (WebSocket) |
| Autenticação | Supabase Auth |
| Infraestrutura | Railway (backend), Vercel (web admin) |
| Pagamentos | Asaas (recorrência, split, Pix, boleto) |
| Roteamento | Google Maps Directions API |
| Notificações | Firebase Cloud Messaging (Android) + APNs (iOS) |
| Build CI/CD | Codemagic |

---

## 11. Roadmap por fases

### Fase 1 — Fundação (Semanas 1–4)
- [ ] Schema multitenant com RLS no Supabase
- [ ] Auth com roles (superadmin, tenant_admin, motorista, passageiro)
- [ ] CRUD de tenants, vans, motoristas, passageiros, rotas
- [ ] Painel web admin (React)
- [ ] App base com Capacitor

### Fase 2 — Operação diária (Semanas 5–8)
- [ ] Fluxo de confirmação de presença
- [ ] Notificações push (Firebase + APNs)
- [ ] Lista do dia para o motorista
- [ ] Confirmação de embarque por passageiro
- [ ] Histórico de corridas

### Fase 3 — Financeiro (Semanas 9–12)
- [ ] Integração Asaas: criação de clientes
- [ ] Recorrência mensal automática
- [ ] Cobrança avulsa por corrida
- [ ] Webhooks de pagamento
- [ ] Split por rota
- [ ] Bloqueio por inadimplência
- [ ] Painel financeiro do admin

### Fase 4 — Inteligência de rota (Semanas 13–15)
- [ ] Chamada Google Maps Directions API com waypoints
- [ ] Otimização de rota pós-corte
- [ ] Exibição do mapa no app do motorista
- [ ] ETA por passageiro

### Fase 5 — Rastreamento ao vivo (Semanas 16–18)
- [ ] Envio de posição GPS via Supabase Realtime
- [ ] Mapa ao vivo no app do passageiro
- [ ] ETA dinâmico com base na posição atual
- [ ] Push "van chegando" (2 paradas de distância)

### Fase 6 — SaaS e escala (Semanas 19–22)
- [ ] Painel super admin
- [ ] Planos de assinatura e billing do operador
- [ ] Onboarding self-service de operador
- [ ] Métricas e analytics por tenant

---

## 12. Critérios de aceite por fase

Cada fase só é considerada entregue quando:
- Todos os itens do checklist estão implementados e testados
- Fluxos principais funcionam em dispositivo físico (iOS e Android)
- Nenhum dado vaza entre tenants (teste de isolamento)
- Push notifications funcionam em background

---

## 13. Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Custo Google Maps API crescer com escala | Média | Alto | Monitorar quota; avaliar OSRM open-source na Fase 4 |
| Bateria do motorista com GPS ativo | Alta | Médio | Intervalo de 8s no envio; otimizar background location |
| Passageiros não confirmando antes do corte | Alta | Médio | Push agressivo às 21h30; configurar padrão como "presente" por rota |
| Churn de operador por complexidade | Baixa | Alto | Onboarding guiado passo a passo; suporte ativo Fase 1 |
| Webhook Asaas falhando silenciosamente | Baixa | Alto | Fila de retry + log de webhooks + alertas |
