const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")
const criarApp = require("../src")

function arquivoTemporario() {
    return path.join(os.tmpdir(), `teamsync-${process.pid}-${Date.now()}.json`)
}

test("cadastra equipe, projeto e distribui tarefa", () => {
    const arquivo = arquivoTemporario()
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

    fs.rmSync(arquivo, { force: true })
})

test("valida email e retorna usuario inexistente", () => {
    const arquivo = arquivoTemporario()
    const app = criarApp(arquivo)

    assert.throws(() => app.service.cadastrarUsuario({ nome: "B", email: "sem-email" }))
    assert.equal(app.service.buscarUsuario(999), null)

    fs.rmSync(arquivo, { force: true })
})

test("persiste os dados no JSON e os carrega ao iniciar novamente", () => {
    const arquivo = arquivoTemporario()
    const app = criarApp(arquivo)
    const usuario = app.service.cadastrarUsuario({ nome: "Bia", email: "bia@teamsync.com" })

    const dadosSalvos = JSON.parse(fs.readFileSync(arquivo, "utf8"))
    assert.equal(dadosSalvos.usuarios[0].email, "bia@teamsync.com")

    const appReiniciado = criarApp(arquivo)
    assert.equal(appReiniciado.service.buscarUsuario(usuario.id).nome, "Bia")

    fs.rmSync(arquivo, { force: true })
})

test("mantem os relacionamentos ao remover usuarios, equipes e projetos", () => {
    const arquivo = arquivoTemporario()
    const app = criarApp(arquivo)
    const usuario = app.service.cadastrarUsuario({ nome: "Caio", email: "caio@teamsync.com" })
    const equipe = app.service.cadastrarEquipe({ nome: "Equipe API" })
    app.service.adicionarIntegrante(equipe.id, usuario.id)
    const projeto = app.service.cadastrarProjeto({ equipe_id: equipe.id, nome: "API" })
    const tarefa = app.service.cadastrarTarefa({
        projeto_id: projeto.id,
        responsavel_id: usuario.id,
        titulo: "Criar rota"
    })

    app.service.removerUsuario(usuario.id)
    assert.deepEqual(app.service.listarIntegrantes(equipe.id), [])
    assert.equal(app.service.buscarTarefa(tarefa.id).responsavel_id, null)

    app.service.removerEquipe(equipe.id)
    assert.deepEqual(app.service.listarProjetos(), [])
    assert.deepEqual(app.service.listarTarefas(), [])

    fs.rmSync(arquivo, { force: true })
})

test("API cadastra e lista usuarios", async () => {
    const arquivo = arquivoTemporario()
    const app = criarApp(arquivo)
    const servidor = app.listen(0, "127.0.0.1")

    await new Promise(resolve => servidor.once("listening", resolve))
    const url = `http://127.0.0.1:${servidor.address().port}/usuarios`

    try {
        const cadastro = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: "Dani", email: "dani@teamsync.com" })
        })
        assert.equal(cadastro.status, 201)

        const resposta = await fetch(url)
        assert.equal(resposta.status, 200)
        assert.equal((await resposta.json())[0].nome, "Dani")
    } finally {
        await new Promise(resolve => servidor.close(resolve))
        fs.rmSync(arquivo, { force: true })
    }
})

