const express = require("express")

const router = express.Router()

const clientes = [
    { id: 1, nome: "Ana", contato: "9999-1414" },
    { id: 2, nome: "Bruno", contato: "9999-1515" }
]

router.get("/", (req, res) => {
    res.status(200).json(clientes)
})

router.get("/total", (req, res) => {
    res.status(200).json({ total: clientes.length })
})

module.exports = router