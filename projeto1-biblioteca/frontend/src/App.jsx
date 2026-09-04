import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import ListaLivros from './pages/ListaLivros.jsx'
import FormLivro from './pages/FormLivro.jsx'
import Emprestimos from './pages/Emprestimos.jsx'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/livros">Livros</Link>
        <Link to="/livros/novo">Novo Livro</Link>
        <Link to="/emprestimos">Emprestimos</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/livros" element={<ListaLivros />} />
          <Route path="/livros/novo" element={<FormLivro />} />
          <Route path="/livros/:id/editar" element={<FormLivro />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
        </Routes>
      </div>
    </div>
  )
}

export default App