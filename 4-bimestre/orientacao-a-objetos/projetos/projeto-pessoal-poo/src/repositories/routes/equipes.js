const express = require("express")
const router = express.Router()

module.exports = function criarEquipesRouter(service) {
    router.get("/", (req, res) => res.json(service.listarEquipes()))

    router.get("/:id", (req, res) => {
        const equipe = service.buscarEquipe(Number(req.params.id))
        if (!equipe) return res.status(404).json({ erro: "Equipe nao encontrada" })
        res.json({ ...equipe, integrantes: service.listarIntegrantes(equipe.id) })
    })

    router.post("/", (req, res, next) => {
        try { res.status(201).json(service.cadastrarEquipe(req.body)) }
        catch (erro) { erro.status = 400; next(erro) }
    })

    router.put("/:id", (req, res, next) => {
        try {
            const equipe = service.editarEquipe(Number(req.params.id), req.body)
            if (!equipe) return res.status(404).json({ erro: "Equipe nao encontrada" })
            res.json(equipe)
        } catch (erro) { erro.status = 400; next(erro) }
    })

    router.delete("/:id", (req, res) => {
        if (!service.removerEquipe(Number(req.params.id))) return res.status(404).json({ erro: "Equipe nao encontrada" })
        res.status(204).send()
    })

    router.post("/:id/integrantes", (req, res, next) => {
        try {
            const usuario = service.adicionarIntegrante(Number(req.params.id), Number(req.body.usuario_id))
            res.status(201).json(usuario)
        } catch (erro) { erro.status = 400; next(erro) }
    })

    router.delete("/:id/integrantes/:usuarioId", (req, res) => {
        const removido = service.removerIntegrante(Number(req.params.id), Number(req.params.usuarioId))
        if (!removido) return res.status(404).json({ erro: "Integrante nao encontrado na equipe" })
        res.status(204).send()
    })

    return router
}
