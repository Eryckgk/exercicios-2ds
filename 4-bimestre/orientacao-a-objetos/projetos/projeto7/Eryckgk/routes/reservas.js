const express = require("express")
const validarReserva = require("../middlewares/validarReserva")

const router = express.Router()

let reservas = [
    { id: 1, responsavel: "Ana", horario: "18h", valor: 80, situacao: "realizada" },
    { id: 2, responsavel: "Bruno", horario: "19h", valor: 80, situacao: "confirmada" },
    { id: 3, responsavel: "Carla", horario: "20h", valor: 90, situacao: "confirmada" }
]

router.get("/", (req, res) => {
    let resultado = reservas
    const { situacao, valorMin } = req.query

    if (situacao !== undefined) {
        resultado = resultado.filter(reserva => reserva.situacao === situacao)
    }

    if (valorMin !== undefined) {
        resultado = resultado.filter(reserva => reserva.valor >= Number(valorMin))
    }

    res.status(200).json(resultado)
})

router.get("/:id", (req, res, next) => {
    const reserva = reservas.find(item => item.id === Number(req.params.id))

    if (!reserva) {
        const erro = new Error("Reserva nao encontrado")
        erro.status = 404
        return next(erro)
    }

    res.status(200).json(reserva)
})

router.post("/", validarReserva, (req, res) => {
    const maiorId = Math.max(...reservas.map(reserva => reserva.id))
    const novaReserva = {
        id: maiorId + 1,
        responsavel: req.body.responsavel,
        horario: req.body.horario,
        valor: req.body.valor,
        situacao: "solicitada"
    }

    reservas.push(novaReserva)
    res.status(201).json({ mensagem: "Registro de reserva criado" })
})

module.exports = router