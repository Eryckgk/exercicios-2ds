// Ferramentas de teste
import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest"

// Importando componente
import Filme from "../components/Filme"

describe("Filme", () => {

 test("renderiza título do filme", () => {
  render(<Filme titulo="Matrix" ano={1999} />)

  expect(
    screen.getByText(/matrix/i)
  ).toBeTruthy()
})

test("renderiza ano do filme", () => {
  render(<Filme titulo="Matrix" ano={1999} />)

  expect(
    screen.getByText(/1999/i)
  ).toBeTruthy()
})

})