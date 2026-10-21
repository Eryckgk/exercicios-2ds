const express = require("express")
const bebidasRouter = require("./bebidas")
const clientesRouter = require("./clientes")

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API de Cafeteria" })
})

router.use("/bebidas", bebidasRouter)
router.use("/clientes", clientesRouter)

module.exports = router