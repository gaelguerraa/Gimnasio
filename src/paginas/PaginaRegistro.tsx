import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { registrarse } from '../servicios/gimnasio.ts'
import { mensajeDeError } from '../servicios/api.ts'
import { useSesion } from '../hooks/useSesion.ts'

export function PaginaRegistro() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const { guardar } = useSesion()
  const navigate = useNavigate()

  async function alEnviar(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      guardar(await registrarse(nombre, correo, password))
      navigate('/clases')
    } catch (err) {
      setError(mensajeDeError(err, 'No se pudo crear la cuenta.'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={alEnviar}>
      <h1>Crear cuenta</h1>

      <label className="campo">
        <span className="campo__etiqueta">Nombre</span>
        <input className="campo__control" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" required />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Correo</span>
        <input className="campo__control" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete="email" required />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Contraseña</span>
        <input className="campo__control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <button className="boton boton--ancho" type="submit" disabled={enviando}>
        {enviando ? 'Creando…' : 'Crear cuenta'}
      </button>

      <p className="formulario__pie">
        ¿Ya tienes cuenta? <Link to="/entrar">Entra</Link>
      </p>
    </form>
  )
}
