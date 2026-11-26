const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const criarApp = require("../src")

function bancoTemporario() {
    return path.join(os.tmpdir(), `teamsync-${process.pid}-${Date.now()}.sqlite`)
}

test("cadastra equipe, projeto e distribui tarefa", () => {
    const arquivo = bancoTemporario()
    const app = criarApp(arquivo)

    const usuario = app.service.cadastrarUsuario({ nome: "Ana", email: "ana@teamsync.com" })
    const equipe = app.service.cadastrarEquipe({ nome: "Equipe Front", descricao: "Interface" })
    app.service.adicionarIntegrante(equipe.id, usuario.id)
    const projeto = app.service.cadastrarProjeto({ equipe_id: equipe.id, nome: "Site", prazo: "2026-12-01" })
    const tarefa = app.service.cadastrarTarefa({
        projeto_id: projeto.id,
        responsavel_id: usuario.id,
        titulo: "Criar tela",
        prioridade: "alta",
        prazo: "2026-11-30"
    })

    assert.equal(tarefa.titulo, "Criar tela")
    assert.equal(app.service.progressoProjeto(projeto.id).porcentagem, 0)
    app.service.editarTarefa(tarefa.id, { status: "concluida" })
    assert.equal(app.service.progressoProjeto(projeto.id).porcentagem, 100)

    app.database.fechar()
    fs.rmSync(arquivo, { force: true })
})

test("valida email e retorna usuario inexistente", () => {
    const arquivo = bancoTemporario()
    const app = criarApp(arquivo)

    assert.throws(() => app.service.cadastrarUsuario({ nome: "B", email: "sem-email" }))
    assert.equal(app.service.buscarUsuario(999), null)

    app.database.fechar()
    fs.rmSync(arquivo, { force: true })
})

