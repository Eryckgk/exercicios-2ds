class Tarefa {
    constructor(dados) {
        this.id = dados.id
        this.projeto_id = dados.projeto_id
        this.responsavel_id = dados.responsavel_id || null
        this.titulo = dados.titulo
        this.descricao = dados.descricao || ""
        this.prioridade = dados.prioridade || "media"
        this.prazo = dados.prazo || null
        this.status = dados.status || "pendente"
    }

    validar() {
        if (!this.projeto_id) throw new Error("Informe o id do projeto")
        if (!this.titulo || this.titulo.trim().length < 2) {
            throw new Error("O titulo da tarefa precisa ter pelo menos 2 caracteres")
        }
        if (!["baixa", "media", "alta"].includes(this.prioridade)) {
            throw new Error("Prioridade invalida")
        }
        if (!["pendente", "em andamento", "concluida"].includes(this.status)) {
            throw new Error("Status da tarefa invalido")
        }
        if (this.prazo && !/^\d{4}-\d{2}-\d{2}$/.test(this.prazo)) {
            throw new Error("Prazo invalido; use o formato AAAA-MM-DD")
        }
    }
}

module.exports = Tarefa
