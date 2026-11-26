const http = require("http")

class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = (baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "")
    }

    async requisitar(caminho, opcoes = {}) {
        const url = new URL(caminho, this.baseUrl)
        const corpo = opcoes.body

        return new Promise((resolve, reject) => {
            const requisicao = http.request(url, {
                method: opcoes.method || "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(corpo ? { "Content-Length": Buffer.byteLength(corpo) } : {})
                }
            }, (resposta) => {
                let texto = ""
                resposta.setEncoding("utf-8")
                resposta.on("data", parte => { texto += parte })
                resposta.on("end", () => {
                    if (resposta.statusCode === 204) {
                        resolve(true)
                        return
                    }

                    let dados = null
                    try { dados = texto ? JSON.parse(texto) : null } catch {
                        reject(new Error("A API respondeu com conteudo invalido"))
                        return
                    }

                    if (resposta.statusCode < 200 || resposta.statusCode >= 300) {
                        reject(new Error(dados?.erro || `Erro HTTP ${resposta.statusCode}`))
                        return
                    }
                    resolve(dados)
                })
            })

            requisicao.on("error", () => {
                reject(new Error(`Nao foi possivel conectar a API em ${this.baseUrl}. Verifique se ela esta rodando.`))
            })

            if (corpo) requisicao.write(corpo)
            requisicao.end()
        })
    }

    get(caminho) { return this.requisitar(caminho) }
    post(caminho, dados) { return this.requisitar(caminho, { method: "POST", body: JSON.stringify(dados) }) }
    put(caminho, dados) { return this.requisitar(caminho, { method: "PUT", body: JSON.stringify(dados) }) }
    delete(caminho) { return this.requisitar(caminho, { method: "DELETE" }) }
}

module.exports = ApiClient
