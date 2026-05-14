# VanRotas

**VanRotas** e um projeto didatico de desenvolvimento web full stack baseado em uma plataforma SaaS para gestao de transporte escolar e fretado.

O objetivo do projeto e permitir que turmas de **Frontend** e **Backend** trabalhem de forma colaborativa em um produto realista, praticando Git, GitHub, React, rotas, consumo de API, Express, banco de dados, autenticacao, regras de negocio e integracao entre sistemas.

---

## Visao do produto

O VanRotas conecta operadores de vans, motoristas e passageiros em um unico sistema.

Principais ideias do produto:

- O passageiro confirma se vai embarcar.
- O motorista visualiza a lista do dia.
- A rota pode ser otimizada com base nos passageiros confirmados.
- O passageiro acompanha a van em tempo real.
- O operador acompanha frota, rotas, passageiros e financeiro.

Este repositorio esta sendo usado como base para aulas, praticas guiadas e atividades colaborativas.

---

## Publico do repositorio

Este projeto e destinado a:

- Alunos da turma de Frontend.
- Alunos da turma de Backend.
- Professores e monitores.
- Colaboradores do GitHub.
- Pessoas interessadas em acompanhar a evolucao do projeto.

---

## Stack atual

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS mobile-first inspirado em apps iOS

### Backend planejado

- Node.js
- Express
- TypeScript
- Supabase/Postgres
- Autenticacao por roles
- API REST

---

## Estrutura do repositorio

```text
vans/
  apps/
    mobile/
      src/
        App.tsx
        App.css
        main.tsx
        index.css
      package.json
  GUIA_ALUNOS_GIT_E_LOCALHOST.md
  PLANO_DISCIPLINAS_VANROTAS.md
  PROJETO_SISTEMA_VANROTAS.md
  PRD-VanRotas (1).md
  README.md
```

### Arquivos importantes

- `PRD-VanRotas (1).md`: documento original de produto.
- `PROJETO_SISTEMA_VANROTAS.md`: arquitetura e desenho tecnico do sistema.
- `PLANO_DISCIPLINAS_VANROTAS.md`: planejamento das trilhas de Frontend e Backend.
- `GUIA_ALUNOS_GIT_E_LOCALHOST.md`: passo a passo para clonar, rodar e colaborar no projeto.
- `apps/mobile`: aplicacao frontend atual.

---

## Como clonar o projeto

Escolha uma pasta no seu computador e rode:

```bash
git clone https://github.com/JRicardos/vans.git
```

Entre na pasta:

```bash
cd vans
```

Abra no VS Code ou Cursor:

```bash
code .
```

ou abra manualmente a pasta pelo editor.

---

## Como rodar o frontend

Entre na pasta do app mobile:

```bash
cd apps/mobile
```

Instale as dependencias:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Normalmente o Vite abrira em:

```text
http://localhost:5173/
```

Se quiser usar uma porta fixa para evitar conflito com outros projetos:

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Abra no navegador:

```text
http://127.0.0.1:5174/
```

---

## Rotas atuais do frontend

Com o projeto rodando, as principais rotas sao:

```text
/passageiro
/motorista
/admin
/rota
/pagamentos
/perfil
```

Versao publicada na Vercel:

```text
https://vans-ueg.vercel.app/
```

Rotas na versao publicada:

```text
https://vans-ueg.vercel.app/passageiro
https://vans-ueg.vercel.app/motorista
https://vans-ueg.vercel.app/admin
https://vans-ueg.vercel.app/rota
https://vans-ueg.vercel.app/pagamentos
https://vans-ueg.vercel.app/perfil
```

Exemplo usando a porta `5174`:

```text
http://127.0.0.1:5174/passageiro
http://127.0.0.1:5174/motorista
http://127.0.0.1:5174/admin
```

---

## Comandos uteis

Dentro de `apps/mobile`:

```bash
npm run dev
```

Roda o projeto localmente.

```bash
npm run lint
```

Verifica padroes e possiveis problemas no codigo.

```bash
npm run build
```

Gera uma versao de producao e valida TypeScript/build.

---

## Como contribuir

Antes de comecar uma tarefa, atualize sua maquina:

```bash
git pull
```

Crie uma branch para sua atividade:

```bash
git checkout -b nome-da-sua-branch
```

Exemplos:

```bash
git checkout -b frontend-tela-pagamentos
git checkout -b frontend-componentes
git checkout -b backend-healthcheck
git checkout -b backend-endpoint-passageiro
```

Depois de alterar os arquivos:

```bash
git status
git add .
git commit -m "Descreve a alteracao feita"
git push -u origin nome-da-sua-branch
```

Em seguida, abra um **Pull Request** no GitHub.

---

## Regras de colaboracao

- Nao trabalhar diretamente na branch principal.
- Criar uma branch por tarefa.
- Fazer commits pequenos e objetivos.
- Rodar `npm run lint` antes de abrir Pull Request.
- Rodar `npm run build` antes de abrir Pull Request.
- Nao enviar `node_modules`.
- Nao editar manualmente arquivos da pasta `dist`.
- Avisar a turma quando for alterar arquivos muito compartilhados, como `App.tsx` e `App.css`.
- Resolver conflitos com calma e pedir ajuda quando necessario.

---

## Trilhas de ensino

### Turma de Frontend

Foco em:

- React.
- Componentes.
- CSS.
- React Router.
- UX mobile.
- Consumo de API.
- Estados de loading e erro.
- Integracao com backend.

### Turma de Backend

Foco em:

- Express.
- TypeScript.
- API REST.
- Autenticacao.
- Roles.
- Banco de dados.
- Regras de negocio.
- Contratos para o frontend.

O planejamento completo esta em:

```text
PLANO_DISCIPLINAS_VANROTAS.md
```

---

## Documentacao recomendada

Leia estes arquivos antes de contribuir:

```text
GUIA_ALUNOS_GIT_E_LOCALHOST.md
PRD-VanRotas (1).md
PROJETO_SISTEMA_VANROTAS.md
PLANO_DISCIPLINAS_VANROTAS.md
```

Ordem sugerida para alunos:

1. `GUIA_ALUNOS_GIT_E_LOCALHOST.md`
2. `README.md`
3. `PRD-VanRotas (1).md`
4. `PLANO_DISCIPLINAS_VANROTAS.md`
5. `PROJETO_SISTEMA_VANROTAS.md`

---

## Estado atual do projeto

Ja foi implementado:

- Base React + TypeScript + Vite em `apps/mobile`.
- Interface mobile-first inspirada em iOS.
- Rotas com React Router.
- Telas iniciais para passageiro, motorista, admin, rota, pagamentos e perfil.
- Documentacao para alunos.
- Planejamento tecnico do sistema.
- Planejamento didatico das disciplinas.

Proximos passos sugeridos:

- Refatorar `App.tsx` em componentes e paginas.
- Criar pasta `components`.
- Criar pasta `pages`.
- Criar `apps/api` para o backend Express.
- Definir contratos REST iniciais.
- Conectar frontend a endpoints mockados.

---

## Problemas comuns

### O localhost abriu outro projeto

Use uma porta fixa:

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Depois acesse:

```text
http://127.0.0.1:5174/
```

Se ainda abrir outro projeto, teste em aba anonima ou limpe o cache/service worker do navegador.

### `npm` nao foi reconhecido

Instale o Node.js LTS e abra um novo terminal.

### `git` nao foi reconhecido

Instale o Git e abra um novo terminal.

---

## Objetivo pedagogico

Ao trabalhar neste repositorio, os alunos devem praticar:

- Colaboracao com Git e GitHub.
- Organizacao de branches.
- Commits e Pull Requests.
- Desenvolvimento React.
- Criacao de rotas.
- Componentizacao.
- Integracao frontend/backend.
- Boas praticas de codigo.
- Leitura de documentacao tecnica.
- Trabalho em equipe em um produto realista.

---

## Licenca e uso academico

Este projeto esta sendo desenvolvido com finalidade educacional.

Antes de reutilizar em outro contexto, verifique com os responsaveis pelo repositorio.
