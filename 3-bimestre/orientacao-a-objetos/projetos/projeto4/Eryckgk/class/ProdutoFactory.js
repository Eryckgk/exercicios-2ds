const Smartphone = require("./Smartphone")
const Notebook = require("./Notebook")
const Tablet = require("./Tablet")

function criar(tipo, nome, garantiaEmMeses) {
    switch (tipo) {
        case "smartphone":
            return new Smartphone(nome, garantiaEmMeses)

        case "notebook":
            return new Notebook(nome, garantiaEmMeses)

        case "tablet":
            return new Tablet(nome, garantiaEmMeses)

        default:
            throw new Error("Tipo de produto inválido")
    }
}

module.exports = {
    criar
}