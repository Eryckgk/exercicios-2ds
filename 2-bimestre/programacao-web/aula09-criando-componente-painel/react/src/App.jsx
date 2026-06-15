import Painel from "./components/Painel/Painel"

export default function App() {
  return (
    <div>

      <Painel>
        <h2>Aluno</h2>
        <p>Eryck - Informática</p>
      </Painel>

      <Painel>
        <h2>Filme</h2>
        <p>Matrix (1999)</p>
      </Painel>

      <Painel>
        <button>Clique aqui</button>
      </Painel>

    </div>
  )
}