# VanRotas - Plano de Ensino por Disciplinas

Documento adaptado do canvas de planejamento didatico.

Este documento organiza o projeto **VanRotas** como atividade de ensino para duas turmas separadas:

- Turma de **Frontend**.
- Turma de **Backend**.

A ideia e que as duas turmas trabalhem no mesmo produto, com entregas independentes e momentos planejados de integracao.

---

## 1. Objetivo do planejamento

Organizar o desenvolvimento do VanRotas em trilhas paralelas.

Principio central:

> As turmas devem evoluir em paralelo. Frontend comeca usando dados mockados e contratos combinados; Backend implementa os contratos aos poucos. A integracao acontece em janelas fixas, evitando que uma turma dependa da outra todos os dias.

Resumo:

| Item | Quantidade |
|---|---:|
| Turmas | 2 |
| Sprints didaticas | 8 |
| Marcos integrados | 4 |
| Demo final | 1 |

---

## 2. Trilhas de trabalho

### 2.1 Trilha Frontend

Foco em produto visivel, componentes, rotas, consumo de API e experiencia mobile.

Tecnologias e temas:

- React.
- React Router.
- CSS responsivo.
- Fetch.
- Estados de UI.
- Acessibilidade.
- Componentizacao.
- Experiencia mobile-first.

### 2.2 Trilha Backend

Foco em API, regras de negocio, banco multitenant, autenticacao, jobs e integracoes.

Tecnologias e temas:

- Express.
- TypeScript.
- Supabase.
- Postgres.
- RLS.
- REST.
- Webhooks.
- Jobs.
- Middlewares.

---

## 3. Sequencia da turma Frontend

| Semana | Tema | Conteudo | Entrega |
|---|---|---|---|
| 1 | Base React | Vite, componentes, CSS, rotas, layout mobile-first. | Tela estatica navegavel. |
| 2 | UI e UX | Design system simples, estados visuais, acessibilidade. | Biblioteca de componentes VanRotas. |
| 3 | Fluxo passageiro | Confirmacao, mapa mockado, pagamento, historico. | Jornada do passageiro com mocks. |
| 4 | Fluxo motorista | Lista do dia, iniciar corrida, embarque, ausente. | Jornada do motorista com mocks. |
| 5 | Fluxo admin | CRUD visual, dashboards e formularios. | Painel admin consumindo mock API. |
| 6 | Integracao API | Fetch, loading, erro, contratos e env vars. | Frontend conectado ao backend local. |
| 7 | Realtime | Assinatura de posicao, estado ativo da corrida. | Mapa atualizando com dados simulados. |
| 8 | Qualidade | Testes de componentes, responsividade, build. | App pronto para demo integrada. |

---

## 4. Sequencia da turma Backend

| Semana | Tema | Conteudo | Entrega |
|---|---|---|---|
| 1 | Base Node | Express, TypeScript, estrutura por modulos, healthcheck. | API local com rotas base. |
| 2 | Banco e tenants | Supabase/Postgres, schema, RLS, seeds. | Modelo multitenant testavel. |
| 3 | Auth e roles | JWT Supabase, middleware, permissoes. | Controle por superadmin/admin/motorista/passageiro. |
| 4 | Operacao | Rotas, vans, passageiros, motoristas, confirmacoes. | CRUDs e regras de presenca. |
| 5 | Corridas | Trip diaria, corte, snapshot, embarques. | Lista do motorista gerada pelo backend. |
| 6 | Contratos API | OpenAPI/DTOs, validacao, erros padronizados. | Contrato usado pela turma de frontend. |
| 7 | Financeiro mock | Modelo Asaas, cobrancas, webhooks fake, idempotencia. | Fluxo de pagamento simulado. |
| 8 | Realtime e jobs | Scheduler, fila simples, Supabase Realtime. | Demo com localizacao e notificacoes fake. |

---

## 5. Marcos de integracao

| Quando | Marco | Objetivo |
|---|---|---|
| Fim semana 2 | Contrato inicial | Backend publica endpoints mockados; Frontend consome JSON estavel. |
| Fim semana 4 | Operacao diaria | Confirmacao do passageiro alimenta lista do motorista. |
| Fim semana 6 | API real | Rotas principais deixam mocks e passam a usar Express + Supabase. |
| Fim semana 8 | Demo final | Fluxo completo: confirmar, gerar trip, motorista iniciar, passageiro acompanhar. |

---

## 6. Contratos compartilhados

Estes contratos ajudam as duas turmas a trabalhar sem bloqueio.

| Endpoint | Uso didatico |
|---|---|
| `GET /me` | Identidade, role e tenant do usuario logado. |
| `GET /passenger/today` | Resumo do dia, rota, ETA, pagamento e confirmacao. |
| `POST /attendance` | Registra Vou/Nao vou antes do corte. |
| `GET /driver/trips/today` | Lista otimizada da corrida do motorista. |
| `PATCH /trips/:id/stops/:stopId` | Marca embarcou ou ausente. |
| `GET /admin/overview` | Metricas de vans, confirmados, receita e pendencias. |

---

## 7. Organizacao do repositorio

Manter monorepo simples:

```text
vans/
  frontend/
    mobile/
  backend/
    api/
```

Estrutura esperada:

- `frontend/mobile`: projeto React + TypeScript + Vite.
- `backend/api`: backend Express + TypeScript.

Fluxo recomendado:

- Cada turma trabalha em branches proprias.
- Cada atividade deve gerar PR pequeno.
- Integracoes acontecem ao fim de cada sprint.
- Mudancas de contrato devem ser combinadas antes de serem implementadas.

---

## 8. Avaliacao da turma Frontend

Pontos avaliados:

- Clareza do fluxo de usuario.
- Responsividade.
- Componentes reutilizaveis.
- Uso correto de React Router.
- Consumo correto da API.
- Estados de loading.
- Estados de erro.
- Acessibilidade.
- Fidelidade ao PRD.
- Qualidade visual e simplicidade da interface.

Exemplos de entregas avaliaveis:

- Tela do passageiro.
- Tela do motorista.
- Tela do admin.
- Componentes compartilhados.
- Navegacao entre rotas.
- Integracao com endpoint real ou mockado.

---

## 9. Avaliacao da turma Backend

Pontos avaliados:

- Modelagem de dados.
- Isolamento por tenant.
- Regras de negocio.
- Validacao de entrada.
- Middlewares de auth/role.
- Testes de API.
- Documentacao dos contratos.
- Idempotencia em webhooks.
- Organizacao modular do Express.
- Clareza nas respostas de erro.

Exemplos de entregas avaliaveis:

- `GET /me`.
- `GET /passenger/today`.
- `POST /attendance`.
- `GET /driver/trips/today`.
- CRUDs administrativos.
- Seeds do banco.
- Testes de isolamento entre tenants.

---

## 10. Proxima aula sugerida

### Frontend

Refatorar `App.tsx` em componentes e paginas.

Sugestao de estrutura:

```text
frontend/mobile/src/
  components/
    BottomTabs.tsx
    HeroCard.tsx
    MapPreview.tsx
    RoleSwitcher.tsx
  pages/
    PassengerHome.tsx
    DriverHome.tsx
    AdminHome.tsx
    RoutePage.tsx
    PaymentsPage.tsx
    ProfilePage.tsx
  data/
    mocks.ts
```

Objetivos:

- Reduzir tamanho de `App.tsx`.
- Separar componentes reutilizaveis.
- Separar paginas por rota.
- Preparar consumo de API.

### Backend

Criar `backend/api` com Express.

Sugestao de estrutura:

```text
backend/api/
  src/
    server.ts
    app.ts
    routes/
      health.routes.ts
      me.routes.ts
    middlewares/
      auth.middleware.ts
      tenant.middleware.ts
    modules/
      users/
      passengers/
      trips/
```

Primeira entrega:

- Servidor Express rodando.
- Endpoint `GET /health`.
- Endpoint mockado `GET /me`.
- Scripts `dev`, `build` e `lint`.
- CORS configurado para o frontend local.

---

## 11. Divisao didatica por tipo de aula

### Aulas de desenvolvimento guiado

O professor implementa com a turma:

- Setup inicial.
- Primeiros componentes.
- Primeiros endpoints.
- Primeira integracao frontend/backend.

### Aulas de pratica em grupo

Os alunos implementam tarefas pequenas:

- Melhorar uma tela.
- Criar um componente.
- Adicionar um endpoint.
- Corrigir validacoes.
- Ajustar estilos.

### Aulas de revisao

Foco em:

- Revisar Pull Requests.
- Discutir conflitos.
- Melhorar nomes.
- Refatorar codigo.
- Comparar mock e API real.

### Aulas de integracao

Foco em:

- Rodar frontend e backend juntos.
- Verificar contratos.
- Corrigir CORS.
- Tratar erros de rede.
- Testar fluxo completo.

---

## 12. Sugestao de backlog inicial

### Backlog Frontend

- Separar paginas do `App.tsx`.
- Criar componente de navegacao inferior.
- Criar componente de mapa mockado.
- Criar componente de card de status.
- Criar componente de lista de paradas.
- Criar tela de pagamentos.
- Criar tela de perfil.
- Criar arquivo de mocks.
- Criar servico de API com `fetch`.
- Tratar loading e erro.

### Backlog Backend

- Criar `backend/api`.
- Configurar Express + TypeScript.
- Criar `GET /health`.
- Criar `GET /me`.
- Criar modelo inicial de usuario/role/tenant.
- Criar middleware de tenant.
- Criar endpoints de passageiro.
- Criar endpoints de motorista.
- Criar endpoints de admin.
- Criar seeds.
- Documentar contratos.

---

## 13. Resultado esperado ao final

Ao final do ciclo, as turmas devem conseguir demonstrar:

1. Passageiro acessa o app.
2. Passageiro confirma presenca.
3. Backend registra a confirmacao.
4. Backend gera ou atualiza a lista da corrida.
5. Motorista visualiza a lista do dia.
6. Motorista inicia corrida.
7. Passageiro acompanha a van em uma simulacao realtime.
8. Admin visualiza indicadores basicos.

Esse fluxo fecha a primeira demo integrada do VanRotas.
