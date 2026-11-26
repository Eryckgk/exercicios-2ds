const express = require("express")
const router = express.Router()

module.exports = function criarProjetosRouter(service) {
    router.get("/", (req, res) => res.json(service.listarProjetos()))

    router.get("/:id", (req, res) => {
        const projeto = service.buscarProjeto(Number(req.params.id))
        if (!projeto) return res.status(404).json({ erro: "Projeto nao encontrado" })
        res.json(projeto)
    })

    router.get("/:id/progresso", (req, res) => {
        const progresso = service.progressoProjeto(Number(req.params.id))
        if (!progresso) return res.status(404).json({ erro: "Projeto nao encontrado" })
        res.json(progresso)
    })

    router.post("/", (req, res, next) => {
        try { res.status(201).json(service.cadastrarProjeto(req.body)) }
        catch (erro) { erro.status = 400; next(erro) }
    })

    router.put("/:id", (req, res, next) => {
        try {
            const projeto = service.editarProjeto(Number(req.params.id), req.body)
            if (!projeto) return res.status(404).json({ erro: "Projeto nao encontrado" })
            res.json(projeto)
        } catch (erro) { erro.status = 400; next(erro) }
    })

    router.delete("/:id", (req, res) => {
        if (!service.removerProjeto(Number(req.params.id))) return res.status(404).json({ erro: "Projeto nao encontrado" })
        res.status(204).send()
    })

    return router
}
