const Cartao = require("./Cartao")

class Debito extends Cartao {
    emitir() {
        return `Cartão de débito emitido para: ${this.titular}`
    }
}

class Credito extends Cartao {
    emitir() {
        return `Cartão de crédito emitido para: ${this.titular}`
    }
}

class Multiplo extends Cartao {
    emitir() {
        return `Cartão múltiplo emitido para: ${this.titular}`
    }
}

function criar(tipo, titular) {
    switch (tipo) {
        case "debito":
            return new Debito(titular)

        case "credito":
            return new Credito(titular)

        case "multiplo":
            return new Multiplo(titular)

        default:
            throw new Error("Tipo de cartão inválido")
    }
}

module.exports = {
    criar
}