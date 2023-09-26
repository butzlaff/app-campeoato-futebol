# App-Campeonato-futebol
<hr />

<p>Este app foi construído visando gerir a classificação de um campeonato de futebol.</p>

<p>Para iniciar o projeto, primeiramente você precisa ter o docker instalado.</p>

<p>Após o docker instalado, inicia os containers com o comando:</p>

```npm run compose:up```

<p>Caso precisa "derrubar" os containers, poderá usar o comando:</p>

```npm run compose:down```

<p>Para instalar as dependências use os comandos a seguir:</p>

<p>Este comando deverá ser feito dentro da pasta: ./app/frontend

    npm run install:front

<p>Este comando deverá ser feito dentro da pasta: ./app/backend

    npm run install:back

Ou você poderá usar o seguinte comando para adicionar as dependências tanto no frontend, quanto no backend: 
<p>Este comando deverá se feito na pasta raiz do projeto

    npm run install:apps

## O Frontend:

<p>O frontend rodará em localhost:3000, esta porta está direcionada ao docker.

## O Backend:

<p>O backend rodará em localhost:3001, esta porta está direcionada ao docker.