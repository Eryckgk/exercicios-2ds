function validarReserva(req, res, next) {
    const { responsavel, horario, valor } = req.body || {}

    if (!responsavel) {
        return res.status(400).json({ erro: "O campo responsavel e obrigatorio" })
    }

    if (!horario) {
        return res.status(400).json({ erro: "O campo horario e obrigatorio" })
    }

    if (typeof valor !== "number") {
        return res.status(400).json({ erro: "O campo valor deve ser um numero" })
    }

    if (valor <= 0) {
        return res.status(400).json({ erro: "O campo valor deve ser maior que zero" })
    }

    next()
}

module.exports = validarReserva