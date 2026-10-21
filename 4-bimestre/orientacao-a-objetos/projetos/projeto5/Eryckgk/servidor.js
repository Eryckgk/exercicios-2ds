const { createServer } = require("node:http")
const handler = require("./index")
const { carregarConfig } = require("./config")

const { porta } = carregarConfig()

createServer(handler).listen(porta, () => {
    console.log(`Servidor de status rodando na porta ${porta}`)
})