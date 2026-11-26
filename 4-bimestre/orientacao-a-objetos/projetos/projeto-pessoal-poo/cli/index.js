const readline = require("readline")
const ApiClient = require("./ApiClient")

class TeamSyncCLI {
    constructor() {
        this.api = new ApiClient(process.env.TEAMSYNC_URL)
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    }

    perguntar(pergunta) {
        return new Promise(resolve => this.rl.question(pergunta, resposta => resolve(resposta.trim())))
    }

    mostrarLista(titulo, dados) {
        console.log(`\n${titulo}`)
        if (!Array.isArray(dados) || dados.length === 0) {
            console.log("Nenhum registro encontrado.")
            return
        }
        dados.forEach(item => console.log(JSON.stringify(item)))
    }

    async executar() {
        while (true) {
            console.log("\n=== TeamSync ===")
            console.log("1. Usuarios")
            console.log("2. Equipes")
            console.log("3. Projetos")
            console.log("4. Tarefas")
            console.log("0. Sair")
            const opcao = await this.perguntar("Escolha uma opcao: ")
            if (opcao === "0") break
            if (opcao === "1") await this.menuUsuarios()
            else if (opcao === "2") await this.menuEquipes()
            else if (opcao === "3") await this.menuProjetos()
            else if (opcao === "4") await this.menuTarefas()
            else console.log("Opcao invalida.")
        }
        this.rl.close()
    }

    async menuUsuarios() {
        console.log("\n1 Listar | 2 Cadastrar | 3 Editar | 4 Excluir")
        const opcao = await this.perguntar("Opcao: ")
        try {
            if (opcao === "1") this.mostrarLista("Usuarios", await this.api.get("/usuarios"))
            if (opcao === "2") {
                const nome = await this.perguntar("Nome: ")
                const email = await this.perguntar("Email: ")
                console.log(await this.api.post("/usuarios", { nome, email }))
            }
            if (opcao === "3") {
                const id = await this.perguntar("Id: ")
                const nome = await this.perguntar("Novo nome: ")
                const email = await this.perguntar("Novo email: ")
                console.log(await this.api.put(`/usuarios/${id}`, { nome, email }))
            }
            if (opcao === "4") {
                const id = await this.perguntar("Id: ")
                await this.api.delete(`/usuarios/${id}`)
                console.log("Usuario excluido.")
            }
        } catch (erro) { console.log(`Erro: ${erro.message}`) }
    }

    async menuEquipes() {
        console.log("\n1 Listar | 2 Cadastrar | 3 Editar | 4 Excluir | 5 Ver integrantes | 6 Adicionar integrante | 7 Remover integrante")
        const opcao = await this.perguntar("Opcao: ")
        try {
            if (opcao === "1") this.mostrarLista("Equipes", await this.api.get("/equipes"))
            if (opcao === "2") {
                const nome = await this.perguntar("Nome: ")
                const descricao = await this.perguntar("Descricao: ")
                console.log(await this.api.post("/equipes", { nome, descricao }))
            }
            if (opcao === "3") {
                const id = await this.perguntar("Id: ")
                const nome = await this.perguntar("Novo nome: ")
                const descricao = await this.perguntar("Nova descricao: ")
                console.log(await this.api.put(`/equipes/${id}`, { nome, descricao }))
            }
            if (opcao === "4") {
                await this.api.delete(`/equipes/${await this.perguntar("Id: ")}`)
                console.log("Equipe excluida.")
            }
            if (opcao === "5") {
                const id = await this.perguntar("Id da equipe: ")
                const equipe = await this.api.get(`/equipes/${id}`)
                this.mostrarLista(`Integrantes de ${equipe.nome}`, equipe.integrantes)
            }
            if (opcao === "6") {
                const id = await this.perguntar("Id da equipe: ")
                const usuarioId = await this.perguntar("Id do usuario: ")
                console.log(await this.api.post(`/equipes/${id}/integrantes`, { usuario_id: Number(usuarioId) }))
            }
            if (opcao === "7") {
                const id = await this.perguntar("Id da equipe: ")
                const usuarioId = await this.perguntar("Id do usuario: ")
                await this.api.delete(`/equipes/${id}/integrantes/${usuarioId}`)
                console.log("Integrante removido.")
            }
        } catch (erro) { console.log(`Erro: ${erro.message}`) }
    }

    async menuProjetos() {
        console.log("\n1 Listar | 2 Cadastrar | 3 Editar | 4 Excluir | 5 Ver progresso")
        const opcao = await this.perguntar("Opcao: ")
        try {
            if (opcao === "1") this.mostrarLista("Projetos", await this.api.get("/projetos"))
            if (opcao === "2") {
                const equipeId = await this.perguntar("Id da equipe: ")
                const nome = await this.perguntar("Nome: ")
                const descricao = await this.perguntar("Descricao: ")
                const prazo = await this.perguntar("Prazo (AAAA-MM-DD): ")
                console.log(await this.api.post("/projetos", { equipe_id: Number(equipeId), nome, descricao, prazo: prazo || null }))
            }
            if (opcao === "3") {
                const id = await this.perguntar("Id: ")
                const status = await this.perguntar("Novo status (planejado, em andamento, concluido): ")
                console.log(await this.api.put(`/projetos/${id}`, { status }))
            }
            if (opcao === "4") {
                await this.api.delete(`/projetos/${await this.perguntar("Id: ")}`)
                console.log("Projeto excluido.")
            }
            if (opcao === "5") {
                const id = await this.perguntar("Id do projeto: ")
                console.log(await this.api.get(`/projetos/${id}/progresso`))
            }
        } catch (erro) { console.log(`Erro: ${erro.message}`) }
    }

    async menuTarefas() {
        console.log("\n1 Listar | 2 Cadastrar | 3 Atualizar status | 4 Excluir")
        const opcao = await this.perguntar("Opcao: ")
        try {
            if (opcao === "1") this.mostrarLista("Tarefas", await this.api.get("/tarefas"))
            if (opcao === "2") {
                const projetoId = await this.perguntar("Id do projeto: ")
                const responsavelId = await this.perguntar("Id do responsavel (deixe vazio): ")
                const titulo = await this.perguntar("Titulo: ")
                const descricao = await this.perguntar("Descricao: ")
                const prioridade = await this.perguntar("Prioridade (baixa, media, alta): ")
                const prazo = await this.perguntar("Prazo (AAAA-MM-DD): ")
                console.log(await this.api.post("/tarefas", {
                    projeto_id: Number(projetoId),
                    responsavel_id: responsavelId ? Number(responsavelId) : null,
                    titulo, descricao, prioridade: prioridade || "media", prazo: prazo || null
                }))
            }
            if (opcao === "3") {
                const id = await this.perguntar("Id: ")
                const status = await this.perguntar("Novo status (pendente, em andamento, concluida): ")
                console.log(await this.api.put(`/tarefas/${id}`, { status }))
            }
            if (opcao === "4") {
                await this.api.delete(`/tarefas/${await this.perguntar("Id: ")}`)
                console.log("Tarefa excluida.")
            }
        } catch (erro) { console.log(`Erro: ${erro.message}`) }
    }
}

new TeamSyncCLI().executar()
