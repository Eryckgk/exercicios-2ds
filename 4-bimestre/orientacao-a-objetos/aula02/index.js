function handler(req, res) {
    if (req.url === "/") {
        res.statusCode = 200
        res.end("API no ar")
        return
    }

    if (req.url === "/status") {
        const porta = process.env.PORT === undefined ? 3000 : Number(process.env.PORT)

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({ status: "online", porta }))
        return
    }

    res.statusCode = 404
    res.end("Rota nao encontrada")
}

module.exports = handler