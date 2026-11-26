const Usuario = require("../models/Usuario")

class UsuarioRepository {
    constructor(database) {
        this.database = database
    }

    listar() {
        return this.database.preparar("SELECT * FROM usuarios ORDER BY id").all().map(row => new Usuario(row))
    }

    buscarPorId(id) {
        const row = this.database.preparar("SELECT * FROM usuarios WHERE id = ?").get(id)
        return row ? new Usuario(row) : null
    }

    buscarPorEmail(email) {
        const row = this.database.preparar("SELECT * FROM usuarios WHERE email = ?").get(email)
        return row ? new Usuario(row) : null
    }

    criar(usuario) {
        usuario.validar()
        if (this.buscarPorEmail(usuario.email)) throw new Error("Ja existe um usuario com este email")
        const result = this.database.preparar("INSERT INTO usuarios (nome, email) VALUES (?, ?)").run(usuario.nome.trim(), usuario.email.trim())
        return this.buscarPorId(Number(result.lastInsertRowid))
    }

    atualizar(id, dados) {
        const usuario = this.buscarPorId(id)
        if (!usuario) return null
        const novo = new Usuario({ ...usuario, ...dados, id })
        novo.validar()
        if (dados.email) {
            const existente = this.buscarPorEmail(dados.email)
            if (existente && existente.id !== id) throw new Error("Ja existe um usuario com este email")
        }
        this.database.preparar("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?").run(novo.nome.trim(), novo.email.trim(), id)
        return this.buscarPorId(id)
    }

    remover(id) {
        const usuario = this.buscarPorId(id)
        if (!usuario) return false
        this.database.preparar("DELETE FROM usuarios WHERE id = ?").run(id)
        return true
    }
}

module.exports = UsuarioRepository
