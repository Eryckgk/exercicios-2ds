class Produto {
    #nome
    #garantiaEmMeses

    constructor(nome, garantiaEmMeses) {
        this.#nome = nome
        this.#garantiaEmMeses = garantiaEmMeses
    }

    get nome() {
        return this.#nome
    }

    get garantiaEmMeses() {
        return this.#garantiaEmMeses
    }

    descricao() {
        return "Produto cadastrado na loja"
    }
}

module.exports = Produto