# TeamSync

TeamSync é um projeto de organização e gerenciamento de equipes desenvolvido em JavaScript. O sistema permite cadastrar usuários, organizar equipes, criar projetos, distribuir tarefas e acompanhar o progresso.

## Objetivo

Demonstrar na prática os conteúdos de Programação Orientada a Objetos estudados no 4º bimestre: classes, objetos, métodos, atributos, organização em módulos, Express, rotas, validação, persistência e CRUD.

## Tecnologias

- Node.js
- JavaScript
- Express
- SQLite, usando `node:sqlite`
- Terminal e HTTP

## Funcionalidades

- CRUD de usuários
- CRUD de equipes
- Adição e remoção de integrantes
- CRUD de projetos
- CRUD de tarefas
- Responsável, prioridade e prazo nas tarefas
- Atualização de status
- Cálculo do progresso de cada projeto
- CLI para consumir a API
- Validação de dados e mensagens de erro em JSON

## Estrutura

```text
projeto-pessoal-poo/
├── cli/
│   ├── ApiClient.js
│   └── index.js
├── src/
│   ├── database/
│   │   └── Database.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Equipe.js
│   │   ├─ Projeto.js
│   │   └─ Tarefa.js
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── index.js
│   └── servidor.js
├── test/
│   └── teamsync.test.js
├── package.json
└── README.md
```

## Instalação

Dentro da pasta do projeto:

```bash
npm install
```

## Executar a API

```bash
npm start
```

A API fica disponível em `http://127.0.0.1:3000`.

Para usar outra porta ou banco:

```bash
PORT=3001 TEAMSYNC_DB=teamsync.sqlite npm start
```

## Executar o terminal

Com a API aberta em outro terminal:

```bash
npm run cli
```

A URL padrão da CLI é `http://127.0.0.1:3000`. Para outra porta:

```bash
TEAMSYNC_URL=http://127.0.0.1:3001 npm run cli
```

## Principais rotas

| Método | Caminho | Função |
|---|---|---|
| GET | `/usuarios` | listar usuários |
| POST | `/usuarios` | cadastrar usuário |
| PUT | `/usuarios/:id` | editar usuário |
| DELETE | `/usuarios/:id` | remover usuário |
| GET | `/equipes` | listar equipes |
| POST | `/equipes` | cadastrar equipe |
| POST | `/equipes/:id/integrantes` | adicionar integrante |
| DELETE | `/equipes/:id/integrantes/:usuarioId` | remover integrante |
| GET | `/projetos` | listar projetos |
| POST | `/projetos` | cadastrar projeto |
| GET | `/projetos/:id/progresso` | acompanhar progresso |
| GET | `/tarefas` | listar tarefas |
| POST | `/tarefas` | cadastrar tarefa |
| PUT | `/tarefas/:id` | atualizar tarefa |

Os filtros podem ser enviados em `/tarefas?projeto_id=1&status=pendente&responsavel_id=1`.

## Testes

```bash
npm test
```

## Banco de dados

O projeto cria automaticamente o arquivo `teamsync.sqlite` na primeira execução. Ao apagar o arquivo, o banco é recriado vazio na próxima inicialização.
