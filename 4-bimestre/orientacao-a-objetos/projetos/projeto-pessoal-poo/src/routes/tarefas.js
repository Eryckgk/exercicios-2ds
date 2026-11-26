const express = require("express")
const router = express.Router()

module.exports = function criarTarefasRouter(service) {
    router.get("/", (req, res) => res.json(service.listarTarefas(req.query)))
    router.get("/:id", (req, res) => {
        const tarefa = service.buscarTarefa(Number(req.params.id))
        if (!tarefa) return res.status(404).json({ erro: "Tarefa nao encontrada" })
        res.json(tarefa)
    })
    router.post("/", (req, res, next) => {
        try { res.status(201).json(service.cadastrarTarefa(req.body)) }
        catch (erro) { erro.status = 400; next(erro) }
    })
    router.put("/:id", (req, res, next) => {
        try {
            const tarefa = service.editarTarefa(Number(req.params.id), req.body)
            if (!tarefa) return res.status(404).json({ erro: "Tarefa nao encontrada" })
            res.json(tarefa)
        } catch (erro) { erro.status = 400; next(erro) }
    })
    router.delete("/:id", (req, res) => {
        if (!service.removerTarefa(Number(req.params.id))) return res.status(404).json({ erro: "Tarefa nao encontrada" })
        res.status(204).send()
    })
    return router
}
