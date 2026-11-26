const express = require("express")
const fs = require("fs")
const path = require("path")
const Usuario = require("./models/Usuario")
const Equipe = require("./models/Equipe")
const Projeto = require("./models/Projeto")
const Tarefa = require("./models/Tarefa")

function criarApp(caminhoDados) {
    const caminho = caminhoDados || path.join(__dirname, "..", "teamsync.json")
    const dados = fs.existsSync(caminho)
        ? JSON.parse(fs.readFileSync(caminho, "utf8"))
        : { usuarios: [], equipes: [], equipe_integrantes: [], projetos: [], tarefas: [] }
    const app = express()

    app.use(express.json())

    function salvar() {
        fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), "utf8")
    }

    function lista(colecao) {
        return dados[colecao]
    }

    function proximoId(colecao) {
        return Math.max(0, ...lista(colecao).map(item => item.id || 0)) + 1
    }

    if (!fs.existsSync(caminho)) salvar()

    function buscar(colecao, id) {
        return lista(colecao).find(item => item.id === Number(id)) || null
    }

    function adicionar(colecao, item) {
        item.id = proximoId(colecao)
        lista(colecao).push(item)
        salvar()
        return item
    }

    function atualizar(colecao, id, item) {
        const registros = lista(colecao)
        const indice = registros.findIndex(registro => registro.id === Number(id))
        if (indice < 0) return null
        registros[indice] = item
        salvar()
        return item
    }

    function remover(colecao, id) {
        const registros = lista(colecao)
        const filtrada = registros.filter(item => item.id !== Number(id))
        if (filtrada.length === registros.length) return false
        dados[colecao] = filtrada
        return true
    }

    const service = {
        listarUsuarios: () => lista("usuarios").map(item => new Usuario(item)),
        buscarUsuario: id => {
            const usuario = buscar("usuarios", id)
            return usuario && new Usuario(usuario)
        },
        cadastrarUsuario: dadosUsuario => {
            const usuario = new Usuario(dadosUsuario)
            usuario.validar()
            usuario.nome = usuario.nome.trim()
            usuario.email = usuario.email.trim()
            if (lista("usuarios").some(item => item.email === usuario.email)) {
                throw new Error("Ja existe um usuario com este email")
            }
            return new Usuario(adicionar("usuarios", usuario))
        },
        editarUsuario: (id, alteracoes) => {
            const atual = buscar("usuarios", id)
            if (!atual) return null
            const usuario = new Usuario({ ...atual, ...alteracoes, id: Number(id) })
            usuario.validar()
            usuario.nome = usuario.nome.trim()
            usuario.email = usuario.email.trim()
            if (lista("usuarios").some(item => item.email === usuario.email && item.id !== Number(id))) {
                throw new Error("Ja existe um usuario com este email")
            }
            return new Usuario(atualizar("usuarios", id, usuario))
        },
        removerUsuario: id => {
            if (!remover("usuarios", id)) return false
            dados.equipe_integrantes = dados.equipe_integrantes.filter(item => item.usuario_id !== Number(id))
            dados.tarefas.forEach(tarefa => {
                if (tarefa.responsavel_id === Number(id)) tarefa.responsavel_id = null
            })
            salvar()
            return true
        },

        listarEquipes: () => lista("equipes").map(equipe => ({
            ...equipe,
            total_integrantes: dados.equipe_integrantes.filter(item => item.equipe_id === equipe.id).length
        })),
        buscarEquipe: id => {
            const equipe = buscar("equipes", id)
            return equipe && new Equipe(equipe)
        },
        cadastrarEquipe: dadosEquipe => {
            const equipe = new Equipe(dadosEquipe)
            equipe.validar()
            equipe.nome = equipe.nome.trim()
            equipe.descricao = equipe.descricao.trim()
            return new Equipe(adicionar("equipes", equipe))
        },
        editarEquipe: (id, alteracoes) => {
            const atual = buscar("equipes", id)
            if (!atual) return null
            const equipe = new Equipe({ ...atual, ...alteracoes, id: Number(id) })
            equipe.validar()
            equipe.nome = equipe.nome.trim()
            equipe.descricao = equipe.descricao.trim()
            return new Equipe(atualizar("equipes", id, equipe))
        },
        removerEquipe: id => {
            if (!remover("equipes", id)) return false
            const projetos = dados.projetos.filter(item => item.equipe_id === Number(id)).map(item => item.id)
            dados.equipe_integrantes = dados.equipe_integrantes.filter(item => item.equipe_id !== Number(id))
            dados.projetos = dados.projetos.filter(item => item.equipe_id !== Number(id))
            dados.tarefas = dados.tarefas.filter(item => !projetos.includes(item.projeto_id))
            salvar()
            return true
        },
        listarIntegrantes: equipeId => {
            const ids = dados.equipe_integrantes
                .filter(item => item.equipe_id === Number(equipeId))
                .map(item => item.usuario_id)
            return dados.usuarios
                .filter(usuario => ids.includes(usuario.id))
                .sort((a, b) => a.nome.localeCompare(b.nome))
        },
        adicionarIntegrante: (equipeId, usuarioId) => {
            if (!buscar("equipes", equipeId)) throw new Error("Equipe nao encontrada")
            const usuario = buscar("usuarios", usuarioId)
            if (!usuario) throw new Error("Usuario nao encontrado")
            if (dados.equipe_integrantes.some(item =>
                item.equipe_id === Number(equipeId) && item.usuario_id === Number(usuarioId)
            )) throw new Error("Usuario ja faz parte da equipe")
            dados.equipe_integrantes.push({ equipe_id: Number(equipeId), usuario_id: Number(usuarioId) })
            salvar()
            return new Usuario(usuario)
        },
        removerIntegrante: (equipeId, usuarioId) => {
            const antes = dados.equipe_integrantes.length
            dados.equipe_integrantes = dados.equipe_integrantes.filter(item =>
                item.equipe_id !== Number(equipeId) || item.usuario_id !== Number(usuarioId)
            )
            if (dados.equipe_integrantes.length === antes) return false
            salvar()
            return true
        },

        listarProjetos: () => lista("projetos").map(item => new Projeto(item)),
        buscarProjeto: id => {
            const projeto = buscar("projetos", id)
            return projeto && new Projeto(projeto)
        },
        cadastrarProjeto: dadosProjeto => {
            const projeto = new Projeto(dadosProjeto)
            projeto.validar()
            projeto.equipe_id = Number(projeto.equipe_id)
            if (!buscar("equipes", projeto.equipe_id)) throw new Error("Equipe nao encontrada")
            projeto.nome = projeto.nome.trim()
            projeto.descricao = projeto.descricao.trim()
            return new Projeto(adicionar("projetos", projeto))
        },
        editarProjeto: (id, alteracoes) => {
            const atual = buscar("projetos", id)
            if (!atual) return null
            const projeto = new Projeto({ ...atual, ...alteracoes, id: Number(id) })
            projeto.validar()
            projeto.equipe_id = Number(projeto.equipe_id)
            if (!buscar("equipes", projeto.equipe_id)) throw new Error("Equipe nao encontrada")
            projeto.nome = projeto.nome.trim()
            projeto.descricao = projeto.descricao.trim()
            return new Projeto(atualizar("projetos", id, projeto))
        },
        removerProjeto: id => {
            if (!remover("projetos", id)) return false
            dados.tarefas = dados.tarefas.filter(item => item.projeto_id !== Number(id))
            salvar()
            return true
        },
        progressoProjeto: id => {
            const projeto = buscar("projetos", id)
            if (!projeto) return null
            const tarefas = dados.tarefas.filter(item => item.projeto_id === Number(id))
            const concluidas = tarefas.filter(item => item.status === "concluida").length
            return {
                projeto: projeto.nome,
                total: tarefas.length,
                concluidas,
                pendentes: tarefas.length - concluidas,
                porcentagem: tarefas.length ? Math.round(concluidas / tarefas.length * 100) : 0
            }
        },

        listarTarefas: (filtros = {}) => dados.tarefas
            .filter(item =>
                (!filtros.projeto_id || item.projeto_id === Number(filtros.projeto_id)) &&
                (!filtros.status || item.status === filtros.status) &&
                (!filtros.responsavel_id || item.responsavel_id === Number(filtros.responsavel_id))
            )
            .slice()
            .sort((a, b) => {
                const ordem = { alta: 1, media: 2, baixa: 3 }
                return ordem[a.prioridade] - ordem[b.prioridade] || a.id - b.id
            })
            .map(item => new Tarefa(item)),
        buscarTarefa: id => {
            const tarefa = buscar("tarefas", id)
            return tarefa && new Tarefa(tarefa)
        },
        cadastrarTarefa: dadosTarefa => {
            const tarefa = new Tarefa(dadosTarefa)
            tarefa.validar()
            tarefa.projeto_id = Number(tarefa.projeto_id)
            if (tarefa.responsavel_id) tarefa.responsavel_id = Number(tarefa.responsavel_id)
            const projeto = buscar("projetos", tarefa.projeto_id)
            if (!projeto) throw new Error("Projeto nao encontrado")
            if (tarefa.responsavel_id && !dados.equipe_integrantes.some(item =>
                item.equipe_id === projeto.equipe_id && item.usuario_id === tarefa.responsavel_id
            )) throw new Error("Responsavel nao pertence a equipe do projeto")
            tarefa.titulo = tarefa.titulo.trim()
            tarefa.descricao = tarefa.descricao.trim()
            return new Tarefa(adicionar("tarefas", tarefa))
        },
        editarTarefa: (id, alteracoes) => {
            const atual = buscar("tarefas", id)
            if (!atual) return null
            const tarefa = new Tarefa({ ...atual, ...alteracoes, id: Number(id) })
            tarefa.validar()
            tarefa.projeto_id = Number(tarefa.projeto_id)
            if (tarefa.responsavel_id) tarefa.responsavel_id = Number(tarefa.responsavel_id)
            const projeto = buscar("projetos", tarefa.projeto_id)
            if (!projeto) throw new Error("Projeto nao encontrado")
            if (tarefa.responsavel_id && !dados.equipe_integrantes.some(item =>
                item.equipe_id === projeto.equipe_id && item.usuario_id === tarefa.responsavel_id
            )) throw new Error("Responsavel nao pertence a equipe do projeto")
            tarefa.titulo = tarefa.titulo.trim()
            tarefa.descricao = tarefa.descricao.trim()
            return new Tarefa(atualizar("tarefas", id, tarefa))
        },
        removerTarefa: id => {
            if (!remover("tarefas", id)) return false
            salvar()
            return true
        }
    }

    function erro400(acao) {
        return (req, res, next) => {
            try {
                acao(req, res)
            } catch (erro) {
                erro.status = 400
                next(erro)
            }
        }
    }

    function registrarCrud(caminho, nome, metodos, detalhes) {
        app.get(caminho, (req, res) => res.json(metodos.listar(req.query)))
        app.get(`${caminho}/:id`, (req, res) => {
            const item = metodos.buscar(Number(req.params.id))
            if (!item) return res.status(404).json({ erro: `${nome} nao encontrado` })
            res.json(detalhes ? detalhes(item) : item)
        })
        app.post(caminho, erro400((req, res) => res.status(201).json(metodos.criar(req.body))))
        app.put(`${caminho}/:id`, erro400((req, res) => {
            const item = metodos.editar(Number(req.params.id), req.body)
            if (!item) return res.status(404).json({ erro: `${nome} nao encontrado` })
            res.json(item)
        }))
        app.delete(`${caminho}/:id`, (req, res) => {
            if (!metodos.remover(Number(req.params.id))) {
                return res.status(404).json({ erro: `${nome} nao encontrado` })
            }
            res.status(204).send()
        })
    }

    app.get("/", (req, res) => res.json({ nome: "TeamSync API", status: "online" }))
    registrarCrud("/usuarios", "Usuario", {
        listar: service.listarUsuarios,
        buscar: service.buscarUsuario,
        criar: service.cadastrarUsuario,
        editar: service.editarUsuario,
        remover: service.removerUsuario
    })
    registrarCrud("/equipes", "Equipe", {
        listar: service.listarEquipes,
        buscar: service.buscarEquipe,
        criar: service.cadastrarEquipe,
        editar: service.editarEquipe,
        remover: service.removerEquipe
    }, equipe => ({ ...equipe, integrantes: service.listarIntegrantes(equipe.id) }))
    registrarCrud("/projetos", "Projeto", {
        listar: service.listarProjetos,
        buscar: service.buscarProjeto,
        criar: service.cadastrarProjeto,
        editar: service.editarProjeto,
        remover: service.removerProjeto
    })
    registrarCrud("/tarefas", "Tarefa", {
        listar: service.listarTarefas,
        buscar: service.buscarTarefa,
        criar: service.cadastrarTarefa,
        editar: service.editarTarefa,
        remover: service.removerTarefa
    })

    app.post("/equipes/:id/integrantes", erro400((req, res) => {
        res.status(201).json(service.adicionarIntegrante(Number(req.params.id), Number(req.body.usuario_id)))
    }))
    app.delete("/equipes/:id/integrantes/:usuarioId", (req, res) => {
        if (!service.removerIntegrante(Number(req.params.id), Number(req.params.usuarioId))) {
            return res.status(404).json({ erro: "Integrante nao encontrado na equipe" })
        }
        res.status(204).send()
    })
    app.get("/projetos/:id/progresso", (req, res) => {
        const progresso = service.progressoProjeto(Number(req.params.id))
        if (!progresso) return res.status(404).json({ erro: "Projeto nao encontrado" })
        res.json(progresso)
    })

    app.use((req, res) => res.status(404).json({ erro: "Rota nao encontrada" }))
    app.use((erro, req, res, next) => res.status(erro.status || 500).json({ erro: erro.message }))

    app.service = service
    return app
}

module.exports = criarApp
