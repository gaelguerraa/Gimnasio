import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { ProveedorSesion } from './contexto/ProveedorSesion.tsx'

// BrowserRouter envuelve toda la app para que cualquier componente
// pueda usar Link, useParams, useNavigate, etc.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Dentro del Router (por si la sesión necesita navegar) y fuera de App: todo la ve */}
      <ProveedorSesion>
        <App />
      </ProveedorSesion>
    </BrowserRouter>
  </StrictMode>,
)
