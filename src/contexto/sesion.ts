// contexto/sesion.ts — el contexto en sí. Empieza en undefined a propósito:
// así useSesion puede detectar que alguien lo usó fuera del proveedor.
import { createContext } from 'react';
import type { Sesion, Usuario } from '../tipos.ts';

export interface ValorSesion {
  sesion: Sesion | null;
  usuario: Usuario | null;
  guardar: (sesion: Sesion) => void; // después de un login o registro exitoso
  salir: () => void;
}

export const ContextoSesion = createContext<ValorSesion | undefined>(undefined);
