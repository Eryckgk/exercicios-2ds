class Usuario {
    constructor(dados) {
        this.id = dados.id
        this.nome = dados.nome
        this.email = dados.email
    }

    validar() {
        if (!this.nome || this.nome.trim().length < 2) {
            throw new Error("O nome precisa ter pelo menos 2 caracteres")
        }
        if (!this.email || !this.email.includes("@")) {
            throw new Error("Informe um email valido")
        }
    }
}

module.exports = Usuario
