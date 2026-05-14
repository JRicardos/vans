# Backend

Esta pasta e exclusiva para a turma de **Backend**.

Aqui ficarao a API Express, regras de negocio, integracoes, banco de dados, autenticacao, middlewares, jobs e contratos consumidos pelo Frontend.

## Projeto planejado

```text
backend/
  api/
```

O backend ainda sera implementado em:

```text
backend/api
```

Stack planejada:

- Node.js
- Express
- TypeScript
- Supabase/Postgres
- API REST
- Middlewares de autenticacao, role e tenant

## Primeira entrega esperada

A primeira atividade da turma de Backend sera criar a base da API:

- `GET /health`
- `GET /me`
- Estrutura modular em Express
- Scripts `dev`, `build` e `lint`
- CORS liberado para o frontend local

## Regras para os alunos de Backend

- Trabalhar apenas dentro de `backend/`, salvo combinados com o professor.
- Nao alterar arquivos de `frontend/` sem alinhamento com a turma de Frontend.
- Documentar qualquer contrato que o Frontend precise consumir.
- Validar entradas da API.
- Manter respostas de erro padronizadas.
- Evitar misturar regra de negocio diretamente nas rotas.
