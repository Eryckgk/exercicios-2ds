const Produto = require("./Produto")

class Tablet extends Produto {
    descricao() {
        return "Tablet disponível para venda"
    }
}

module.exports = Tablet