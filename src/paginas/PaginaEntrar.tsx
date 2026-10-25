import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { iniciarSesion } from '../servicios/gimnasio.ts'
import { mensajeDeError } from '../servicios/api.ts'
import { useSesion } from '../hooks/useSesion.ts'

export function PaginaEntrar() {
  // Formulario controlado: el estado es la fuente de verdad de lo que hay en cada input
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const { guardar } = useSesion()
  const navigate = useNavigate()

  async function alEnviar(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault() // sin esto el navegador recarga la página
    setError(null)
    setEnviando(true)
    try {
      const sesion = await iniciarSesion(correo, password)
      guardar(sesion)
      navigate('/clases')
    } catch (err) {
      // Si las credenciales están mal, aquí sale el mensaje que mandó la API
      setError(mensajeDeError(err, 'No se pudo conectar con el gimnasio.'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form className="formulario" onSubmit={alEnviar}>
      <h1>Entrar</h1>
      <p className="pagina__bajada">Entra para inscribirte a las clases.</p>

      <label className="campo">
        <span className="campo__etiqueta">Correo</span>
        <input
          className="campo__control"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label className="campo">
        <span className="campo__etiqueta">Contraseña</span>
        <input
          className="campo__control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <button className="boton boton--ancho" type="submit" disabled={enviando}>
        {enviando ? 'Entrando…' : 'Entrar'}
      </button>

      <p className="formulario__pie">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </form>
  )
}
