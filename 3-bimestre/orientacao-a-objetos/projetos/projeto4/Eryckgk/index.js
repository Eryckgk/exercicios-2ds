const ProdutoFactory = require("./class/ProdutoFactory")
const Marca = require("./class/Marca")
const Estoque = require("./class/Estoque")
const Venda = require("./class/Venda")

const membro = ProdutoFactory.criar(
    "smartphone",
    "Galaxy X",
    12
)

const marca = new Marca("TechOne", 2023)

const estoque = new Estoque("Estoque Central")

const venda = new Venda(1999, marca)

membro.adicionarRegistro(venda)

estoque.adicionarCategoria(marca)
estoque.adicionarMembro(membro)

console.log(membro.nome)
console.log(membro.garantiaEmMeses)
console.log(membro.descricao())

console.log(marca)
console.log(estoque)
console.log(membro.registros)