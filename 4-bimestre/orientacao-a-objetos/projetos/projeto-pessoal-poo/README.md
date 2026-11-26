# TeamSync

Aplicação para organizar usuários, equipes, projetos e tarefas. Os dados ficam em `teamsync.json`, sem Supabase ou banco de dados.

## Executar

```powershell
npm install
npm start
```

Deixe a API rodando e abra outro terminal para iniciar o menu:

```powershell
npm run cli
```

## Arquivos principais

- `src/index.js`: API e operações dos dados.
- `src/servidor.js`: inicia o servidor.
- `src/models/`: classes que representam e validam os dados.
- `cli/`: interface de terminal que usa a API.

O arquivo `teamsync.json` é criado automaticamente. Para apagar os dados, pare o servidor e remova esse arquivo.

## API

Os recursos `/usuarios`, `/equipes`, `/projetos` e `/tarefas` permitem consultar, cadastrar, editar e remover registros. Também é possível gerenciar integrantes de equipes e consultar o progresso dos projetos.

## Testes

```powershell
npm test
```
