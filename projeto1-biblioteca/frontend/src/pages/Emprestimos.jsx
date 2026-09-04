import { useEffect, useState } from 'react'
import { get, post, put } from '../services/api'

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([])
  const [livros, setLivros] = useState([])
  const [form, setForm] = useState({ livroId: '', nomeUsuario: '' })

  useEffect(() => {
    carregar()
    get('/livros').then(setLivros)
  }, [])

  async function carregar() {
    const dados = await get('/emprestimos')
    const ordenados = [...dados].sort((a, b) => {
      if (a.status === b.status) return 0
      return a.status === 'ATIVO' ? -1 : 1
    })
    setEmprestimos(ordenados)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.livroId || !form.nomeUsuario.trim()) {
      return
    }

    await post('/emprestimos', {
      ...form,
      livroId: Number(form.livroId)
    })

    setForm({ livroId: '', nomeUsuario: '' })
    await carregar()
  }

  async function devolver(id) {
    await put(`/emprestimos/${id}/devolver`, {})
    await carregar()
  }

  return (
    <div>
      <h1>Emprestimos</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="field">
          <label>Livro</label>
          <select
            value={form.livroId}
            onChange={(e) => setForm({ ...form, livroId: e.target.value })}
          >
            <option value="">Selecione...</option>
            {livros.map((l) => (
              <option key={l.id} value={l.id}>{l.titulo}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Nome do usuario</label>
          <input
            value={form.nomeUsuario}
            onChange={(e) => setForm({ ...form, nomeUsuario: e.target.value })}
          />
        </div>
        <button type="submit">Emprestar</button>
      </form>

      <table>
        <thead>
          <tr><th>Livro</th><th>Usuario</th><th>Status</th><th>Previsao</th><th>Acoes</th></tr>
        </thead>
        <tbody>
          {emprestimos.map((emp) => (
            <tr key={emp.id} className={emp.status === 'DEVOLVIDO' ? 'emprestimo-devolvido' : ''}>
              <td>{emp.livroId}</td>
              <td>{emp.nomeUsuario}</td>
              <td>{emp.status}</td>
              <td>{emp.dataDevolucaoPrevista}</td>
              <td>
                {emp.status === 'ATIVO' && (
                  <button onClick={() => devolver(emp.id)}>Devolver</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
