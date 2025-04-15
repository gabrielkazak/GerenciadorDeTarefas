# 📋 Gerenciador de Tarefas Web

Este é um sistema de gestão de tarefas desenvolvido como trabalho prático da matéria de **Criação de Sites 3**. Ele permite que usuários criem, visualizem e organizem tarefas diárias, facilitando a produtividade e o controle do tempo.

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários com JWT.
- 📆 Criação de tarefas com data e horário.
- ⏳ Atualização automática de estado das tarefas:
  - De `pendente` para `atrasada`, caso o prazo expire.
  - De `atrasada` para `pendente`, se a data/hora for ajustada.
- 🔐 Rotas protegidas com autenticação JWT.
- 🧭 Navegação por calendário:
  - Tarefas **pendentes** (hoje e amanhã) na home.
  - Tarefas **atrasadas** (ontem e hoje).
  - Tarefas **concluídas** (ontem e hoje).
  - Clique em data futura abre visão de criação/visualização.
- 🧾 Documentação com Swagger em `/api-docs`.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript, AngularJS
- **Backend**: Node.js, Express
- **Middlewares**:
  - Validador/Gerador de tokens
  - CORS
  - HELMET
  - RateLimiter
  - Limite de tamanho de `body` (`express.json`)
- **Banco de Dados**: PostgreSQL (com suporte a Neon.tech)
- **Documentação**: Swagger

---

## 📁 Estrutura de Diretórios

├── src/
│   ├── controllers/
│   ├── database/
│   ├── docs/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── views/
├── public/
├── server.js
└── README.md

---

## 🔐 Autenticação

- A autenticação é feita via **JWT** em todas as rotas relacionadas as tarefas.

---

## Instalação

1. Clone o repositório:

    git clone https://github.com/gabrielkazak/GerenciadorDeTarefas
    cd gerenciador-tarefas

2. Instalação das dependências:

    Pré-requisitos:
    - Node.js instalado
    - NPM instalado

    Todas as dependências já estão no package.json, apenas rode no terminal:

**npm install**

3. Crie o banco de dados:

Comando usado pra banco PostgreSQL, o original foi feito em Neon.Tech:

    CREATE TABLE usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        nome_usuario VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        horario VARCHAR(50) NOT NULL,
        data DATE NOT NULL,
        id_usuario INT REFERENCES usuarios(id) ON DELETE CASCADE,
        estado VARCHAR(20) CHECK (estado IN ('concluida', 'atrasada', 'pendente')) NOT NULL
    );

4. Crie o arquivo .env baseado no .env.example:

    PGHOST='Host do banco'
    PGDATABASE='Nome do banco'
    PGUSER='Usuario do banco'
    PGPASSWORD='Senha do banco'

    JWT_SECRET= 'string usada para criar o token'

5. Inicie o servidor:

    **npm start**

---

## 📄 Documentação com Swagger
    Acesse: http://localhost:3000/api-docs
    Swagger configurado em ./src/routes/*.js

---

## 👤 Autor

    Gabriel – Estudante de Informática
    Projeto desenvolvido como prática de integração entre backend e frontend.