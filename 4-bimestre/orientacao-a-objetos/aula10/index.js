const express = require("express")

const app = express()
app.use(express.json())

const pedidos = [
    { id: 1, cliente: "Ana", valor: 100 },
    { id: 2, cliente: "Bruno", valor: 250 }
]

function validarPedido(req, res, next) {
    const dados = req.body || {}

    if (!dados.cliente) {
        return res.status(400).json({ erro: "O campo cliente e obrigatorio" })
    }

    if (typeof dados.valor !== "number") {
        return res.status(400).json({ erro: "O campo valor deve ser um numero" })
    }

    next()
}

app.get("/pedidos", (req, res) => {
    const { valorMin } = req.query

    if (valorMin === undefined) {
        return res.status(200).json(pedidos)
    }

    const minimo = Number(valorMin)
    res.status(200).json(pedidos.filter(pedido => pedido.valor >= minimo))
})

app.get("/pedidos/:id", (req, res, next) => {
    const pedido = pedidos.find(item => item.id === Number(req.params.id))

    if (!pedido) {
        const erro = new Error("Pedido nao encontrado")
        erro.status = 404
        return next(erro)
    }

    res.status(200).json(pedido)
})

app.post("/pedidos", validarPedido, (req, res) => {
    res.status(201).json({ mensagem: "Pedido criado" })
})

app.use((req, res) => {
    res.status(404).json({ erro: "Rota nao encontrada" })
})

app.use((erro, req, res, next) => {
    res.status(erro.status || 500).json({ erro: erro.message })
})

module.exports = app