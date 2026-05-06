export default function Prefil() {
  const usuario = {
    nome: "Eryck",
    idade: 16,
    profissão: "Engenheiro de softwere"
  }

    return(
        <div>
          <p>Nome: {usuario.nome}</p>
          <p>Idade: {usuario.idade}</p>
          <p>Profissão: {usuario.profissão}</p>
        </div>
    )
}