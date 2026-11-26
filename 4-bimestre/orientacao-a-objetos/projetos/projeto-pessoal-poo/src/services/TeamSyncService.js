const Usuario = require("../models/Usuario")
const Equipe = require("../models/Equipe")
const Projeto = require("../models/Projeto")
const Tarefa = require("../models/Tarefa")

class TeamSyncService {
    constructor(database, repositorios) {
        this.database = database
        this.usuarios = repositorios.usuarios
        this.equipes = repositorios.equipes
        this.projetos = repositorios.projetos
        this.tarefas = repositorios.tarefas
    }

    listarUsuarios() { return this.usuarios.listar() }
    buscarUsuario(id) { return this.usuarios.buscarPorId(id) }
    cadastrarUsuario(dados) { return this.usuarios.criar(new Usuario(dados)) }
    editarUsuario(id, dados) { return this.usuarios.atualizar(id, dados) }
    removerUsuario(id) { return this.usuarios.remover(id) }

    listarEquipes() { return this.equipes.listar() }
    buscarEquipe(id) { return this.equipes.buscarPorId(id) }
    cadastrarEquipe(dados) { return this.equipes.criar(new Equipe(dados)) }
    editarEquipe(id, dados) { return this.equipes.atualizar(id, dados) }
    removerEquipe(id) { return this.equipes.remover(id) }
    listarIntegrantes(equipeId) { return this.equipes.listarIntegrantes(equipeId) }
    adicionarIntegrante(equipeId, usuarioId) { return this.equipes.adicionarIntegrante(equipeId, usuarioId) }
    removerIntegrante(equipeId, usuarioId) { return this.equipes.removerIntegrante(equipeId, usuarioId) }

    listarProjetos() { return this.projetos.listar() }
    buscarProjeto(id) { return this.projetos.buscarPorId(id) }
    cadastrarProjeto(dados) { return this.projetos.criar(new Projeto(dados)) }
    editarProjeto(id, dados) { return this.projetos.atualizar(id, dados) }
    removerProjeto(id) { return this.projetos.remover(id) }
    progressoProjeto(id) { return this.projetos.progresso(id) }

    listarTarefas(filtros) { return this.tarefas.listar(filtros) }
    buscarTarefa(id) { return this.tarefas.buscarPorId(id) }
    cadastrarTarefa(dados) { return this.tarefas.criar(new Tarefa(dados)) }
    editarTarefa(id, dados) { return this.tarefas.atualizar(id, dados) }
    removerTarefa(id) { return this.tarefas.remover(id) }
}

module.exports = TeamSyncService
