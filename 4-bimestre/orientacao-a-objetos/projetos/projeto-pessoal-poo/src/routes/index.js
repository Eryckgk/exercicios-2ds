const express = require("express")

module.exports = function criarRouterPrincipal(service) {
    const router = express.Router()

    router.get("/", (req, res) => {
        res.json({ nome: "TeamSync API", status: "online" })
    })
    router.use("/usuarios", require("./usuarios")(service))
    router.use("/equipes", require("./equipes")(service))
    router.use("/projetos", require("./projetos")(service))
    router.use("/tarefas", require("./tarefas")(service))

    return router
}
