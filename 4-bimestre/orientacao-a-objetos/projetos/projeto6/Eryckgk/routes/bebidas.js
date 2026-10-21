const express = require("express")

const router = express.Router()

const bebidas = [
    { id: 1, nome: "Espresso", tipo: "cafe", preco: 8, disponivel: true },
    { id: 2, nome: "Cappuccino", tipo: "cafe", preco: 14, disponivel: true },
    { id: 3, nome: "Cha Verde", tipo: "cha", preco: 10, disponivel: false }
]

router.get("/", (req, res) => {
    res.status(200).json(bebidas)
})

router.get("/disponiveis", (req, res) => {
    res.status(200).json(bebidas.filter((bebida) => bebida.disponivel === true))
})

router.get("/total", (req, res) => {
    res.status(200).json({ total: bebidas.length })
})

router.post("/", (req, res) => {
    res.status(201).json({ mensagem: "Cadastro de bebida realizado" })
})

module.exports = router