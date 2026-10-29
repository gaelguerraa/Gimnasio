import { Link } from 'react-router';
import { Cargando } from '../componentes/Cargando.tsx';
import { MensajeError } from '../componentes/MensajeError.tsx';
import { useMisInscripciones } from '../hooks/useMisInscripciones.ts';
import { urlImagen } from '../servicios/api.ts';

export function PaginaMisInscripciones() {
  const { inscripciones, cargando, error, reintentar } = useMisInscripciones();

  if (cargando) return <Cargando />;
  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />;

  return (
    <>
      <section className="pagina__encabezado">
        <h1>Mis inscripciones</h1>
        <p className="pagina__bajada">
          {inscripciones.length === 0
            ? 'Todavía no tienes clases inscritas.'
            : `${inscripciones.length} clase(s) inscrita(s).`}
        </p>
      </section>

      {inscripciones.length === 0 ? (
        <div className="vacio">
          <p>No tienes inscripciones por el momento.</p>
          <Link to="/clases" className="boton">
            Ver clases
          </Link>
        </div>
      ) : (
        <ul className="inscripciones">
          {inscripciones.map((inscripcion) => (
            <li className="inscripcion" key={inscripcion.id}>
              <img
                className="inscripcion__imagen"
                src={urlImagen(inscripcion.clase.imagen)}
                alt={inscripcion.clase.nombre}
              />

              <div>
                <Link
                  to={`/clases/${inscripcion.clase.id}`}
                  className="inscripcion__clase"
                >
                  {inscripcion.clase.nombre}
                </Link>

                <div className="inscripcion__meta">
                  {inscripcion.horario.dia} · {inscripcion.horario.horaInicio} ·{' '}
                  {inscripcion.horario.entrenador}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
