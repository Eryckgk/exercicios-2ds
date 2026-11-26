const express = require("express")
const router = express.Router()

module.exports = function criarUsuariosRouter(service) {
    router.get("/", (req, res) => res.json(service.listarUsuarios()))

    router.get("/:id", (req, res) => {
        const usuario = service.buscarUsuario(Number(req.params.id))
        if (!usuario) return res.status(404).json({ erro: "Usuario nao encontrado" })
        res.json(usuario)
    })

    router.post("/", (req, res, next) => {
        try {
            res.status(201).json(service.cadastrarUsuario(req.body))
        } catch (erro) { erro.status = 400; next(erro) }
    })

    router.put("/:id", (req, res, next) => {
        try {
            const usuario = service.editarUsuario(Number(req.params.id), req.body)
            if (!usuario) return res.status(404).json({ erro: "Usuario nao encontrado" })
            res.json(usuario)
        } catch (erro) { erro.status = 400; next(erro) }
    })

    router.delete("/:id", (req, res) => {
        const removido = service.removerUsuario(Number(req.params.id))
        if (!removido) return res.status(404).json({ erro: "Usuario nao encontrado" })
        res.status(204).send()
    })

    return router
}
