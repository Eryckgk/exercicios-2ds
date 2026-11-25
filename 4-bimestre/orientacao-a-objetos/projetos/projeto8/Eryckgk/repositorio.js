const fs = require("fs/promises")

function caminhoArquivo() {
    return process.env.ARQUIVO_MATRICULAS || "matriculas.json"
}

async function listar() {
    try {
        const conteudo = await fs.readFile(caminhoArquivo(), "utf-8")
        return JSON.parse(conteudo)
    } catch (erro) {
        if (erro.code === "ENOENT") return []
        throw erro
    }
}

async function salvar(matricula) {
    const lista = await listar()
    lista.push(matricula)
    await fs.writeFile(caminhoArquivo(), JSON.stringify(lista, null, 2), "utf-8")
    return matricula
}

async function atualizar(id, dados) {
    const lista = await listar()
    const indice = lista.findIndex((matricula) => matricula.id === id)

    if (indice === -1) return null

    lista[indice] = { ...lista[indice], ...dados }
    await fs.writeFile(caminhoArquivo(), JSON.stringify(lista, null, 2), "utf-8")
    return lista[indice]
}

async function remover(id) {
    const lista = await listar()
    const indice = lista.findIndex((matricula) => matricula.id === id)

    if (indice === -1) return false

    lista.splice(indice, 1)
    await fs.writeFile(caminhoArquivo(), JSON.stringify(lista, null, 2), "utf-8")
    return true
}

module.exports = { listar, salvar, atualizar, remover }
