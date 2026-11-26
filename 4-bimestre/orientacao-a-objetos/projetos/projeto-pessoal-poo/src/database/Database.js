const path = require("path")
const { DatabaseSync } = require("node:sqlite")

class Database {
    constructor(caminho) {
        this.caminho = caminho || path.join(__dirname, "..", "..", "teamsync.sqlite")
        this.conexao = new DatabaseSync(this.caminho)
        this.conexao.exec("PRAGMA foreign_keys = ON")
        this.criarTabelas()
    }

    criarTabelas() {
        this.conexao.exec(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS equipes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                descricao TEXT
            );

            CREATE TABLE IF NOT EXISTS equipe_integrantes (
                equipe_id INTEGER NOT NULL,
                usuario_id INTEGER NOT NULL,
                PRIMARY KEY (equipe_id, usuario_id),
                FOREIGN KEY (equipe_id) REFERENCES equipes(id) ON DELETE CASCADE,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS projetos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                equipe_id INTEGER NOT NULL,
                nome TEXT NOT NULL,
                descricao TEXT,
                prazo TEXT,
                status TEXT NOT NULL DEFAULT 'planejado',
                FOREIGN KEY (equipe_id) REFERENCES equipes(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS tarefas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                projeto_id INTEGER NOT NULL,
                responsavel_id INTEGER,
                titulo TEXT NOT NULL,
                descricao TEXT,
                prioridade TEXT NOT NULL DEFAULT 'media',
                prazo TEXT,
                status TEXT NOT NULL DEFAULT 'pendente',
                FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE,
                FOREIGN KEY (responsavel_id) REFERENCES usuarios(id) ON DELETE SET NULL
            );
        `)
    }

    preparar(sql) {
        return this.conexao.prepare(sql)
    }

    fechar() {
        this.conexao.close()
    }
}

module.exports = Database
// no-op placeholder
