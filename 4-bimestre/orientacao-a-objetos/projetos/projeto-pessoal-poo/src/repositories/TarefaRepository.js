const Tarefa = require("../models/Tarefa")

class TarefaRepository {
    constructor(database) {
        this.database = database
    }

    listar(filtros = {}) {
        let sql = "SELECT * FROM tarefas WHERE 1 = 1"
        const valores = []
        if (filtros.projeto_id) {
            sql += " AND projeto_id = ?"
            valores.push(Number(filtros.projeto_id))
        }
        if (filtros.status) {
            sql += " AND status = ?"
            valores.push(filtros.status)
        }
        if (filtros.responsavel_id) {
            sql += " AND responsavel_id = ?"
            valores.push(Number(filtros.responsavel_id))
        }
        sql += " ORDER BY CASE prioridade WHEN 'alta' THEN 1 WHEN 'media' THEN 2 ELSE 3 END, id"
        return this.database.preparar(sql).all(...valores).map(row => new Tarefa(row))
    }

    buscarPorId(id) {
        const row = this.database.preparar("SELECT * FROM tarefas WHERE id = ?").get(id)
        return row ? new Tarefa(row) : null
    }

    criar(tarefa) {
        tarefa.validar()
        const projeto = this.database.preparar("SELECT id, equipe_id FROM projetos WHERE id = ?").get(tarefa.projeto_id)
        if (!projeto) throw new Error("Projeto nao encontrado")
        if (tarefa.responsavel_id) {
            const integrante = this.database.preparar("SELECT 1 FROM equipe_integrantes WHERE equipe_id = ? AND usuario_id = ?").get(projeto.equipe_id, tarefa.responsavel_id)
            if (!integrante) throw new Error("Responsavel nao pertence a equipe do projeto")
        }
        const result = this.database.preparar(`
            INSERT INTO tarefas (projeto_id, responsavel_id, titulo, descricao, prioridade, prazo, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(tarefa.projeto_id, tarefa.responsavel_id, tarefa.titulo.trim(), tarefa.descricao.trim(), tarefa.prioridade, tarefa.prazo, tarefa.status)
        return this.buscarPorId(Number(result.lastInsertRowid))
    }

    atualizar(id, dados) {
        const tarefa = this.buscarPorId(id)
        if (!tarefa) return null
        const nova = new Tarefa({ ...tarefa, ...dados, id })
        nova.validar()
        if (nova.responsavel_id) {
            const projeto = this.database.preparar("SELECT equipe_id FROM projetos WHERE id = ?").get(nova.projeto_id)
            const integrante = this.database.preparar("SELECT 1 FROM equipe_integrantes WHERE equipe_id = ? AND usuario_id = ?").get(projeto.equipe_id, nova.responsavel_id)
            if (!integrante) throw new Error("Responsavel nao pertence a equipe do projeto")
        }
        this.database.preparar(`
            UPDATE tarefas
            SET projeto_id = ?, responsavel_id = ?, titulo = ?, descricao = ?, prioridade = ?, prazo = ?, status = ?
            WHERE id = ?
        `).run(nova.projeto_id, nova.responsavel_id, nova.titulo.trim(), nova.descricao.trim(), nova.prioridade, nova.prazo, nova.status, id)
        return this.buscarPorId(id)
    }

    remover(id) {
        if (!this.buscarPorId(id)) return false
        this.database.preparar("DELETE FROM tarefas WHERE id = ?").run(id)
        return true
    }
}

module.exports = TarefaRepository
