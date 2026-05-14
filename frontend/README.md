# Frontend

Esta pasta e exclusiva para a turma de **Frontend**.

Aqui ficam as interfaces do VanRotas, componentes React, rotas, estilos, consumo de API e tudo que roda no navegador ou no app mobile.

## Projeto atual

```text
frontend/
  mobile/
```

O app atual esta em:

```text
frontend/mobile
```

Stack:

- React
- TypeScript
- Vite
- React Router
- CSS mobile-first

## Como rodar

Entre na pasta do app:

```bash
cd frontend/mobile
```

Instale as dependencias:

```bash
npm install
```

Rode localmente:

```bash
npm run dev
```

Ou use a porta fixa:

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Abra:

```text
http://127.0.0.1:5174/
```

## Regras para os alunos de Frontend

- Trabalhar apenas dentro de `frontend/`, salvo combinados com o professor.
- Nao alterar arquivos de `backend/` sem alinhamento com a turma de Backend.
- Nao editar arquivos gerados em `dist/`.
- Nao versionar `node_modules`.
- Antes de abrir Pull Request, rodar:

```bash
npm run lint
npm run build
```
