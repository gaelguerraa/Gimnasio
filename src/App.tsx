import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './componentes/Layout.tsx'
import { NoEncontrado } from './componentes/NoEncontrado.tsx'
import { PaginaClases } from './paginas/PaginaClases.tsx'
import { PaginaClase } from './paginas/PaginaClase.tsx'

function App() {
  return (
    <Routes>
      {/* Todas las rutas van dentro del Layout, por eso todas llevan encabezado y pie */}
      <Route element={<Layout />}>
        {/* La portada no tiene nada propio, manda directo al catálogo */}
        <Route index element={<Navigate to="/clases" replace />} />

        <Route path="clases">
          <Route index element={<PaginaClases />} />
          <Route path=":id" element={<PaginaClase />} />
        </Route>

        {/* Cualquier dirección que no esté arriba cae aquí */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
