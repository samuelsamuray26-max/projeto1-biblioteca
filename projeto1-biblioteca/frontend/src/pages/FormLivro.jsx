import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, post, put } from '../services/api'

export default function FormLivro() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    quantidadeTotal: 1
  })

  const [erro, setErro] = useState('')

  useEffect(() => {
    if (id) {
      get(`/livros/${id}`)
          .then(setForm)
          .catch(() => {
            setErro('Erro ao carregar o livro.')
          })
    }
  }, [id])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    const quantidade = Number(form.quantidadeTotal)

    if (!form.titulo.trim()) {
      setErro('Informe o título do livro.')
      return
    }

    if (!form.autor.trim()) {
      setErro('Informe o autor do livro.')
      return
    }

    if (!quantidade || quantidade < 1) {
      setErro('A quantidade total deve ser maior que 0.')
      return
    }

    const dados = {
      ...form,
      quantidadeTotal: quantidade
    }

    try {
      if (id) {
        await put(`/livros/${id}`, dados)
      } else {
        await post('/livros', dados)
      }

      navigate('/livros')
    } catch (error) {
      console.error(error)
      setErro('Não foi possível salvar o livro.')
    }
  }

  return (
      <div>
        <h1>{id ? 'Editar Livro' : 'Novo Livro'}</h1>

        <form className="card" onSubmit={handleSubmit}>

          <div className="field">
            <label>Título</label>
            <input
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Autor</label>
            <input
                name="autor"
                value={form.autor}
                onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>ISBN</label>
            <input
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Quantidade total</label>
            <input
                type="number"
                name="quantidadeTotal"
                min="1"
                value={form.quantidadeTotal}
                onChange={handleChange}
            />
          </div>

          {erro && (
              <p style={{ color: 'red' }}>
                {erro}
              </p>
          )}

          <button type="submit">
            Salvar
          </button>

        </form>
      </div>
  )
}