# Guia dos alunos: GitHub, Git e localhost do VanRotas

Este guia mostra o passo a passo para clonar o projeto **VanRotas**, abrir o frontend na maquina local e trabalhar colaborativamente usando Git e GitHub.

Repositorio oficial:

```bash
https://github.com/JRicardos/vans.git
```

---

## 1. Antes de comecar

Cada aluno precisa ter instalado:

- **Git**
- **Node.js LTS**
- **npm** junto com o Node.js
- **VS Code**
- Uma conta no **GitHub**

Links uteis:

- Git: https://git-scm.com/downloads
- Node.js: https://nodejs.org/
- GitHub: https://github.com/
- VS Code: https://code.visualstudio.com/

Para conferir se esta tudo instalado, abra o terminal e rode:

```bash
git --version
node --version
npm --version
```

Se todos os comandos mostrarem uma versao, o ambiente esta pronto.

---

## 2. Configurar nome e e-mail no Git

Antes de criar commits, configure seu nome e e-mail.

Use o mesmo e-mail da sua conta do GitHub, se possivel.

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

Para conferir:

```bash
git config --global user.name
git config --global user.email
```

---

## 3. Escolher uma pasta para os projetos

No Windows, uma sugestao e criar ou usar a pasta:

```text
C:\Users\SEU_USUARIO\Documents\GitHub
```

No PowerShell, entre na pasta onde voce quer salvar o projeto:

```bash
cd Documents
mkdir GitHub
cd GitHub
```

Se a pasta ja existir, use apenas:

```bash
cd Documents\GitHub
```

No macOS ou Linux, uma sugestao:

```bash
cd ~/Documents
mkdir GitHub
cd GitHub
```

---

## 4. Clonar o repositorio

Agora clone o projeto:

```bash
git clone https://github.com/JRicardos/vans.git
```

Entre na pasta criada:

```bash
cd vans
```

Confira se voce esta dentro do repositorio:

```bash
git status
```

Se aparecer algo como `On branch main` ou `On branch master`, deu certo.

---

## 5. Abrir o projeto no editor

Se estiver usando VS Code:

```bash
code .
```

Se estiver usando Cursor, voce pode:

1. Abrir o Cursor.
2. Clicar em **Open Folder**.
3. Selecionar a pasta `vans`.

Tambem e possivel abrir pelo terminal, se o comando estiver configurado:

```bash
cursor .
```

---

## 6. Entender a estrutura inicial do projeto

Neste momento, a parte principal que vamos visualizar esta em:

```text
apps/mobile
```

Arquivos importantes:

```text
apps/mobile/src/App.tsx
apps/mobile/src/App.css
apps/mobile/src/main.tsx
apps/mobile/src/index.css
apps/mobile/package.json
```

O frontend foi criado com:

- React
- TypeScript
- Vite
- React Router

---

## 7. Instalar as dependencias do frontend

Dentro da raiz do projeto `vans`, entre na pasta do app mobile:

```bash
cd apps/mobile
```

Instale as dependencias:

```bash
npm install
```

Esse comando cria a pasta `node_modules`.

Importante: a pasta `node_modules` nao deve ser enviada para o GitHub.

---

## 8. Abrir o projeto no localhost

Ainda dentro de `apps/mobile`, rode:

```bash
npm run dev
```

O Vite vai mostrar uma URL parecida com:

```text
http://localhost:5173/
```

Abra essa URL no navegador.

Se quisermos usar uma porta fixa para evitar conflito com outros projetos, use:

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Depois abra:

```text
http://127.0.0.1:5174/
```

---

## 9. Se abrir outro projeto antigo

Se ao abrir `localhost:5173` aparecer outro sistema antigo, como um projeto anterior, faca uma destas opcoes:

### Opcao A: usar a porta fixa 5174

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Abra:

```text
http://127.0.0.1:5174/
```

### Opcao B: abrir em aba anonima

Abra uma janela anonima do navegador e acesse a URL novamente.

### Opcao C: limpar cache/service worker

No Chrome ou Edge:

1. Aperte `F12`.
2. Va em **Application**.
3. Clique em **Clear storage**.
4. Clique em **Clear site data**.
5. Va em **Service Workers** e remova registros antigos, se existirem.

---

## 10. Comandos basicos do Git no dia a dia

Ver o estado atual dos arquivos:

```bash
git status
```

Ver quais arquivos foram modificados:

```bash
git diff
```

Baixar atualizacoes do GitHub:

```bash
git pull
```

Adicionar arquivos para commit:

```bash
git add .
```

Criar um commit:

```bash
git commit -m "Descreve o que foi alterado"
```

Enviar sua branch para o GitHub:

```bash
git push
```

---

## 11. Fluxo recomendado para colaboracao

Cada aluno deve trabalhar em uma branch propria.

Antes de criar uma branch, atualize sua base:

```bash
git pull
```

Crie uma nova branch:

```bash
git checkout -b nome-da-sua-branch
```

Exemplos de nomes:

```bash
git checkout -b frontend-tela-pagamentos
git checkout -b frontend-componentes-rota
git checkout -b backend-endpoint-passageiro
git checkout -b backend-auth-roles
```

Depois de editar os arquivos, confira:

```bash
git status
```

Adicione os arquivos:

```bash
git add .
```

Crie o commit:

```bash
git commit -m "Implementa tela de pagamentos"
```

Envie a branch para o GitHub:

```bash
git push -u origin nome-da-sua-branch
```

Exemplo:

```bash
git push -u origin frontend-tela-pagamentos
```

Depois disso, abra um **Pull Request** no GitHub.

---

## 12. O que e um Pull Request

Um Pull Request, ou PR, e um pedido para juntar sua branch com a branch principal do projeto.

Fluxo:

1. O aluno cria uma branch.
2. Faz uma alteracao.
3. Cria commits.
4. Envia para o GitHub.
5. Abre um Pull Request.
6. A turma/professor revisa.
7. Depois da aprovacao, a branch e mesclada no projeto principal.

---

## 13. Como atualizar sua branch com mudancas da turma

Se outras pessoas ja enviaram alteracoes para a branch principal, atualize sua maquina.

Primeiro, salve ou commit suas alteracoes.

Depois va para a branch principal:

```bash
git checkout main
```

Baixe as atualizacoes:

```bash
git pull
```

Volte para sua branch:

```bash
git checkout nome-da-sua-branch
```

Junte as atualizacoes da `main` na sua branch:

```bash
git merge main
```

Se nao houver conflitos, continue trabalhando normalmente.

---

## 14. O que fazer quando houver conflito

Conflito acontece quando duas pessoas alteram a mesma parte de um arquivo.

O Git vai marcar o arquivo com algo parecido:

```text
<<<<<<< HEAD
codigo da sua branch
=======
codigo vindo da outra branch
>>>>>>> main
```

Para resolver:

1. Abra o arquivo no editor.
2. Escolha qual trecho deve ficar.
3. Remova as linhas `<<<<<<<`, `=======` e `>>>>>>>`.
4. Salve o arquivo.
5. Rode:

```bash
git add .
git commit -m "Resolve conflitos com main"
```

Se tiver duvida, chame o professor antes de apagar codigo.

---

## 15. Comandos para validar o frontend

Dentro de `apps/mobile`, rode:

```bash
npm run lint
```

Esse comando verifica problemas de padrao de codigo.

Para gerar uma versao de build:

```bash
npm run build
```

Antes de abrir um Pull Request, rode:

```bash
npm run lint
npm run build
```

---

## 16. Rotas atuais do frontend

Com o servidor local rodando, podemos acessar:

```text
http://127.0.0.1:5174/passageiro
http://127.0.0.1:5174/motorista
http://127.0.0.1:5174/admin
http://127.0.0.1:5174/rota
http://127.0.0.1:5174/pagamentos
http://127.0.0.1:5174/perfil
```

Se estiver usando a porta padrao do Vite, troque `5174` por `5173`.

---

## 17. Boas praticas para a turma

- Sempre rode `git pull` antes de comecar a trabalhar.
- Nunca trabalhe diretamente na branch principal.
- Crie branches pequenas e com nomes claros.
- Faca commits pequenos e objetivos.
- Nao envie `node_modules` para o GitHub.
- Nao edite arquivos da pasta `dist` manualmente.
- Rode `npm run lint` e `npm run build` antes de abrir PR.
- Escreva mensagens de commit explicando o que foi feito.
- Avise a turma quando for alterar arquivos compartilhados, como `App.tsx` ou `App.css`.

---

## 18. Exemplo de rotina completa

Entrar no projeto:

```bash
cd Documents\GitHub\vans
```

Atualizar o projeto:

```bash
git checkout main
git pull
```

Criar uma branch:

```bash
git checkout -b frontend-ajuste-navbar
```

Entrar no frontend:

```bash
cd apps/mobile
```

Instalar dependencias, se ainda nao instalou:

```bash
npm install
```

Rodar o localhost:

```bash
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Editar os arquivos no VS Code ou Cursor.

Validar:

```bash
npm run lint
npm run build
```

Voltar para a raiz do projeto:

```bash
cd ../..
```

Ver arquivos alterados:

```bash
git status
```

Adicionar, commitar e enviar:

```bash
git add .
git commit -m "Ajusta navegacao inferior do app"
git push -u origin frontend-ajuste-navbar
```

Depois, abrir o Pull Request no GitHub.

---

## 19. Problemas comuns

### `npm` nao e reconhecido

Instale o Node.js LTS e abra um novo terminal.

### `git` nao e reconhecido

Instale o Git e abra um novo terminal.

### Porta ocupada

Use outra porta:

```bash
npm run dev -- --host 127.0.0.1 --port 5175 --strictPort
```

Abra:

```text
http://127.0.0.1:5175/
```

### Erro depois de baixar atualizacoes

Apague `node_modules` e instale novamente:

```bash
npm install
```

### Alterei arquivos errados

Antes de apagar qualquer coisa, rode:

```bash
git status
git diff
```

Mostre o resultado para o professor.

---

## 20. Objetivo pedagogico

Ao final deste fluxo, cada aluno deve conseguir:

- Clonar um repositorio do GitHub.
- Rodar um projeto React localmente.
- Criar uma branch.
- Fazer commits.
- Enviar alteracoes para o GitHub.
- Abrir Pull Requests.
- Atualizar sua branch com mudancas da turma.
- Resolver conflitos simples com acompanhamento.
- Colaborar no mesmo projeto sem sobrescrever o trabalho dos colegas.
