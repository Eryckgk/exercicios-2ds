class Projeto {
    constructor(dados) {
        this.id = dados.id
        this.equipe_id = dados.equipe_id
        this.nome = dados.nome
        this.descricao = dados.descricao || ""
        this.prazo = dados.prazo || null
        this.status = dados.status || "planejado"
    }

    validar() {
        if (!this.equipe_id) throw new Error("Informe o id da equipe")
        if (!this.nome || this.nome.trim().length < 2) {
            throw new Error("O nome do projeto precisa ter pelo menos 2 caracteres")
        }
        if (!["planejado", "em andamento", "concluido"].includes(this.status)) {
            throw new Error("Status do projeto invalido")
        }
        if (this.prazo && !/^\d{4}-\d{2}-\d{2}$/.test(this.prazo)) {
            throw new Error("Prazo invalido; use o formato AAAA-MM-DD")
        }
    }
}

module.exports = Projeto
