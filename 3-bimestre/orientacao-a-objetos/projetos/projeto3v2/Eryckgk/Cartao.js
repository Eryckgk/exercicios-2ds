class Cartao {
    constructor(titular) {
        this.titular = titular
    }
}

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

module.exports = Cartao