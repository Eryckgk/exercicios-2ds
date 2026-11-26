const Equipe = require("../models/Equipe")

class EquipeRepository {
    constructor(database) {
        this.database = database
    }

    listar() {
        return this.database.preparar(`
            SELECT e.*, COUNT(ei.usuario_id) AS total_integrantes
            FROM equipes e
            LEFT JOIN equipe_integrantes ei ON ei.equipe_id = e.id
            GROUP BY e.id
            ORDER BY e.id
        `).all()
    }

    buscarPorId(id) {
        const row = this.database.preparar(`
            SELECT e.*, COUNT(ei.usuario_id) AS total_integrantes
            FROM equipes e
            LEFT JOIN equipe_integrantes ei ON ei.equipe_id = e.id
            WHERE e.id = ?
            GROUP BY e.id
        `).get(id)
        return row ? new Equipe(row) : null
    }

    criar(equipe) {
        equipe.validar()
        const result = this.database.preparar("INSERT INTO equipes (nome, descricao) VALUES (?, ?)").run(equipe.nome.trim(), equipe.descricao.trim())
        return this.buscarPorId(Number(result.lastInsertRowid))
    }

    atualizar(id, dados) {
        const equipe = this.buscarPorId(id)
        if (!equipe) return null
        const nova = new Equipe({ ...equipe, ...dados, id })
        nova.validar()
        this.database.preparar("UPDATE equipes SET nome = ?, descricao = ? WHERE id = ?").run(nova.nome.trim(), nova.descricao.trim(), id)
        return this.buscarPorId(id)
    }

    remover(id) {
        if (!this.buscarPorId(id)) return false
        this.database.preparar("DELETE FROM equipes WHERE id = ?").run(id)
        return true
    }

    listarIntegrantes(equipeId) {
        return this.database.preparar(`
            SELECT u.*
            FROM usuarios u
            JOIN equipe_integrantes ei ON ei.usuario_id = u.id
            WHERE ei.equipe_id = ?
            ORDER BY u.nome
        `).all()
    }

    adicionarIntegrante(equipeId, usuarioId) {
        if (!this.buscarPorId(equipeId)) throw new Error("Equipe nao encontrada")
        const usuario = this.database.preparar("SELECT * FROM usuarios WHERE id = ?").get(usuarioId)
        if (!usuario) throw new Error("Usuario nao encontrado")
        const existente = this.database.preparar("SELECT 1 FROM equipe_integrantes WHERE equipe_id = ? AND usuario_id = ?").get(equipeId, usuarioId)
        if (existente) throw new Error("Usuario ja faz parte da equipe")
        this.database.preparar("INSERT INTO equipe_integrantes (equipe_id, usuario_id) VALUES (?, ?)").run(equipeId, usuarioId)
        return usuario
    }

    removerIntegrante(equipeId, usuarioId) {
        const result = this.database.preparar("DELETE FROM equipe_integrantes WHERE equipe_id = ? AND usuario_id = ?").run(equipeId, usuarioId)
        return result.changes > 0
    }
}

module.exports = EquipeRepository
