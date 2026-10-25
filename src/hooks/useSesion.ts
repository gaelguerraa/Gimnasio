// hooks/useSesion.ts — el hook propio para leer la sesión.
import { useContext } from 'react';
import { ContextoSesion, type ValorSesion } from '../contexto/sesion.ts';

export function useSesion(): ValorSesion {
  const valor = useContext(ContextoSesion);
  if (valor === undefined) {
    // Sin esto, el error sería "Cannot read properties of undefined" muy lejos de la causa.
    throw new Error('useSesion debe usarse dentro de <ProveedorSesion>.');
  }
  return valor;
}
