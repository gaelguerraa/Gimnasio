// servicios/gimnasio.ts — las llamadas a la API, tipadas.
// Los componentes sólo ven estas funciones, nunca a Axios.
import { api, type Sobre } from './api.ts';
import type { Clase, ClaseConHorarios, Sesion, Usuario } from '../tipos.ts';

// GET /clases
export async function traerClases(): Promise<Clase[]> {
  const respuesta = await api.get<Sobre<Clase[]>>('/clases');
  return respuesta.data.data; // .data de Axios, y .data del sobre
}

// GET /clases/:id → la clase con sus horarios
export async function traerClase(id: number): Promise<ClaseConHorarios> {
  const respuesta = await api.get<Sobre<ClaseConHorarios>>(`/clases/${id}`);
  return respuesta.data.data;
}

// Lo que regresan /auth/login y /auth/registro (dentro del sobre { data }).
// El backend le llama access_token; en el frontend lo guardamos como "token".
interface RespuestaToken {
  access_token: string;
  token_type: string; // siempre "Bearer"
  expires_in: number; // segundos de vigencia (3600 = 1 hora)
  usuario: Usuario;
}

function aSesion(r: RespuestaToken): Sesion {
  return { token: r.access_token, usuario: r.usuario };
}

// POST /auth/login (el JWT de la Práctica 10)
export async function iniciarSesion(correo: string, password: string): Promise<Sesion> {
  const respuesta = await api.post<Sobre<RespuestaToken>>('/auth/login', { correo, password });
  return aSesion(respuesta.data.data);
}

// POST /auth/registro → misma respuesta que el login: queda con la sesión iniciada
export async function registrarse(nombre: string, correo: string, password: string): Promise<Sesion> {
  const respuesta = await api.post<Sobre<RespuestaToken>>('/auth/registro', { nombre, correo, password });
  return aSesion(respuesta.data.data);
}
