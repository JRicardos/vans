# API VanRotas

Pasta reservada para a API do VanRotas.

Esta API sera desenvolvida pela turma de Backend usando **Node.js + Express + TypeScript**.

## Estrutura sugerida

```text
backend/api/
  src/
    app.ts
    server.ts
    routes/
    middlewares/
    modules/
```

## Endpoints iniciais sugeridos

```text
GET /health
GET /me
GET /passenger/today
POST /attendance
GET /driver/trips/today
GET /admin/overview
```

## Observacao

O Frontend deve consumir somente contratos combinados com a turma de Backend.

Enquanto a API real nao existir, a turma de Frontend pode trabalhar com mocks dentro de `frontend/mobile`.
