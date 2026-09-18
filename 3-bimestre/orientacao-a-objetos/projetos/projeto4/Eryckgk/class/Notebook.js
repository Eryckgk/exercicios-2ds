const Produto = require("./Produto")

class Notebook extends Produto {
    descricao() {
        return "Notebook disponível para venda"
    }
}

module.exports = Notebook