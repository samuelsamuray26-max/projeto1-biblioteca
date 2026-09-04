import { useEffect, useState } from 'react'
import { get, post, put } from '../services/api'

export default function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState([])
  const [livros, setLivros] = useState([])
  const [erro, setErro] = useState('')
  const [form, setForm] = useState({
    livroId: '',
    nomeUsuario: '',
    dataDevolucaoPrevista: ''
  })

  useEffect(() => {
    const carregarDados = async () => {
      const [emprestimosData, livrosData] = await Promise.all([
        get('/emprestimos'),
        get('/livros')
      ])

      setEmprestimos(emprestimosData)
      setLivros(livrosData)
    }

    carregarDados()
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
    setErro('')

    if (!form.livroId || !form.nomeUsuario.trim() || !form.dataDevolucaoPrevista) {
      setErro('Selecione livro, usuário e data de devolução.')
      return
    }

    const hoje = new Date()
    const dataSelecionada = new Date(`${form.dataDevolucaoPrevista}T00:00:00`)

    if (dataSelecionada < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())) {
      setErro('A data de devolução deve ser igual ou posterior ao dia atual.')
      return
    }

    await post('/emprestimos', {
      ...form,
      livroId: Number(form.livroId),
      dataDevolucaoPrevista: form.dataDevolucaoPrevista
    })

    setForm({ livroId: '', nomeUsuario: '', dataDevolucaoPrevista: '' })
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

        <div className="field">
          <label>Data de devolução prevista</label>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={form.dataDevolucaoPrevista}
            onChange={(e) => setForm({ ...form, dataDevolucaoPrevista: e.target.value })}
          />
        </div>

        {erro && <p style={{ color: 'red', marginBottom: '16px' }}>{erro}</p>}

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
