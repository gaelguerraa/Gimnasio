import { create } from 'zustand';
import { mensajeDeError } from '../servicios/api.ts';
import { traerMisInscripciones } from '../servicios/gimnasio.ts';
import type { Inscripcion } from '../tipos.ts';

interface EstadoInscripciones {
  inscripciones: Inscripcion[];
  cargando: boolean;
  error: string | null;
  cargar: () => Promise<void>;
  vaciar: () => void;
}

export const useInscripcionesStore = create<EstadoInscripciones>((set) => {
  let solicitudActual = 0;

  return {
    inscripciones: [],
    cargando: false,
    error: null,
    cargar: async () => {
      const solicitud = ++solicitudActual;
      set({ cargando: true, error: null });
      try {
        const inscripciones = await traerMisInscripciones();
        if (solicitud === solicitudActual) set({ inscripciones, error: null });
      } catch (e) {
        if (solicitud === solicitudActual) {
          set({ error: mensajeDeError(e, 'No se pudieron cargar tus inscripciones.') });
        }
      } finally {
        if (solicitud === solicitudActual) set({ cargando: false });
      }
    },
    vaciar: () => {
      solicitudActual += 1;
      set({ inscripciones: [], cargando: false, error: null });
    },
  };
});
