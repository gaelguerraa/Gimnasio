// <ProveedorSesion> — dueño de la sesión. Envuelve la app en main.tsx.
import { useState, type ReactNode } from 'react';
import { ContextoSesion } from './sesion.ts';
import { borrarSesion, guardarSesion, leerSesion } from '../servicios/almacenSesion.ts';
import type { Sesion } from '../tipos.ts';

export function ProveedorSesion({ children }: { children: ReactNode }) {
  // Función en useState: se lee localStorage una sola vez, al montar.
  // Así, al recargar la página, la sesión sigue ahí.
  const [sesion, setSesion] = useState<Sesion | null>(leerSesion);

  function guardar(nueva: Sesion) {
    guardarSesion(nueva); // al disco...
    setSesion(nueva); //     ...y al estado, para que React vuelva a pintar
  }

  function salir() {
    borrarSesion();
    setSesion(null);
  }

  return (
    <ContextoSesion value={{ sesion, usuario: sesion?.usuario ?? null, guardar, salir }}>
      {children}
    </ContextoSesion>
  );
}
