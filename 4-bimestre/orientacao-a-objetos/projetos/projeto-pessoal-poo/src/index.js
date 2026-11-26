const express = require("express")
const Database = require("./database/Database")
const UsuarioRepository = require("./repositories/UsuarioRepository")
const EquipeRepository = require("./repositories/EquipeRepository")
const ProjetoRepository = require("./repositories/ProjetoRepository")
const TarefaRepository = require("./repositories/TarefaRepository")
const TeamSyncService = require("./services/TeamSyncService")
const criarRouterPrincipal = require("./routes")

function criarApp(caminhoBanco) {
    const database = new Database(caminhoBanco)
    const repositorios = {
        usuarios: new UsuarioRepository(database),
        equipes: new EquipeRepository(database),
        projetos: new ProjetoRepository(database),
        tarefas: new TarefaRepository(database)
    }
    const service = new TeamSyncService(database, repositorios)
    const app = express()

    app.use(express.json())
    app.use("/", criarRouterPrincipal(service))

    app.use((req, res) => {
        res.status(404).json({ erro: "Rota nao encontrada" })
    })

    app.use((erro, req, res, next) => {
        res.status(erro.status || 500).json({ erro: erro.message })
    })

    app.database = database
    app.service = service
    return app
}

module.exports = criarApp
