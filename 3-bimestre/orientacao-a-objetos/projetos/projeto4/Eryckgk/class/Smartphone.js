const Produto = require("./Produto")

class Smartphone extends Produto {
    constructor(nome, garantiaEmMeses) {
        super(nome, garantiaEmMeses)
        this.registros = []
    }

    descricao() {
        return "Smartphone disponível para venda"
    }

    adicionarRegistro(registro) {
        this.registros.push(registro)
    }
}

module.exports = Smartphone