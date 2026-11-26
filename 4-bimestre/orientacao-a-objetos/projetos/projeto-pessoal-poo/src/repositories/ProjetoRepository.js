const Projeto = require("../models/Projeto")

class ProjetoRepository {
    constructor(database) {
        this.database = database
    }

    listar() {
        return this.database.preparar("SELECT * FROM projetos ORDER BY id").all().map(row => new Projeto(row))
    }

    buscarPorId(id) {
        const row = this.database.preparar("SELECT * FROM projetos WHERE id = ?").get(id)
        return row ? new Projeto(row) : null
    }

    criar(projeto) {
        projeto.validar()
        const equipe = this.database.preparar("SELECT id FROM equipes WHERE id = ?").get(projeto.equipe_id)
        if (!equipe) throw new Error("Equipe nao encontrada")
        const result = this.database.preparar(`
            INSERT INTO projetos (equipe_id, nome, descricao, prazo, status)
            VALUES (?, ?, ?, ?, ?)
        `).run(projeto.equipe_id, projeto.nome.trim(), projeto.descricao.trim(), projeto.prazo, projeto.status)
        return this.buscarPorId(Number(result.lastInsertRowid))
    }

    atualizar(id, dados) {
        const projeto = this.buscarPorId(id)
        if (!projeto) return null
        const novo = new Projeto({ ...projeto, ...dados, id })
        novo.validar()
        this.database.preparar(`
            UPDATE projetos SET equipe_id = ?, nome = ?, descricao = ?, prazo = ?, status = ?
            WHERE id = ?
        `).run(novo.equipe_id, novo.nome.trim(), novo.descricao.trim(), novo.prazo, novo.status, id)
        return this.buscarPorId(id)
    }

    remover(id) {
        if (!this.buscarPorId(id)) return false
        this.database.preparar("DELETE FROM projetos WHERE id = ?").run(id)
        return true
    }

    progresso(id) {
        const projeto = this.buscarPorId(id)
        if (!projeto) return null
        const total = this.database.preparar("SELECT COUNT(*) AS total FROM tarefas WHERE projeto_id = ?").get(id).total
        const concluidas = this.database.preparar("SELECT COUNT(*) AS total FROM tarefas WHERE projeto_id = ? AND status = 'concluida'").get(id).total
        const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100)
        return { projeto: projeto.nome, total, concluidas, pendentes: total - concluidas, porcentagem }
    }
}

module.exports = ProjetoRepository
