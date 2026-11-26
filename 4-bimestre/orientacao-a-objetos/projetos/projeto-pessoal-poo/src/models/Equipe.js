class Equipe {
    constructor(dados) {
        this.id = dados.id
        this.nome = dados.nome
        this.descricao = dados.descricao || ""
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 2) {
            throw new Error("O nome da equipe precisa ter pelo menos 2 caracteres")
        }
    }
}

module.exports = Equipe
