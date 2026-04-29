import Header from "./components/Header"
import Footer from "./components/Footer"
import Contato from "./pages/Contato"
import Sobre from "./pages/Sobre"
import Home from "./pages/Home"

export default function App() {
  return(
    <div>
       <Header />

       <main>
         <Home />
	       <Sobre />
	       <Contato />
       </main>

       <Footer />
    </div>
  )
}