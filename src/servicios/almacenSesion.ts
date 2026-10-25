// servicios/almacenSesion.ts — lo único que sabe de localStorage.
// Lo usan el contexto (para arrancar con la sesión guardada) y el interceptor
// de Axios (que no es un componente y por eso no puede leer el contexto).
import type { Sesion } from '../tipos.ts';

const LLAVE = 'gimnasio.sesion';

export function leerSesion(): Sesion | null {
  try {
    const texto = localStorage.getItem(LLAVE);
    if (!texto) return null;
    const sesion = JSON.parse(texto) as Sesion;
    // Si alguien editó el valor a mano y quedó roto, se trata como "sin sesión".
    if (typeof sesion.token !== 'string' || !sesion.usuario?.nombre) return null;
    return sesion;
  } catch {
    return null; // JSON inválido o localStorage no disponible
  }
}

export function guardarSesion(sesion: Sesion): void {
  localStorage.setItem(LLAVE, JSON.stringify(sesion));
}

export function borrarSesion(): void {
  localStorage.removeItem(LLAVE);
}
