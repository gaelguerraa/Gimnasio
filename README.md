

## Ejercicio 1

**¿Por qué se usa un contexto y no props para la sesión?**

Porque la sesión la necesitan componentes que están en partes muy distintas del árbol: el `Encabezado` (que está en el `Layout`), la página de Entrar, y más adelante la de inscripciones. Con props tendría que pasar la sesión por `App`, luego por `Layout`, luego por `Encabezado`, aunque los de en medio no la usen (a eso se le llama *prop drilling*), y cada vez que aparezca un componente nuevo habría que abrirle otro camino. Con el contexto se guarda una sola vez en `<ProveedorSesion>` y cualquier componente de adentro la lee con `useSesion()`, sin importar qué tan abajo esté.

**¿Qué pasa si un componente usa la sesión fuera del proveedor?**

`useContext` regresa el valor por defecto del contexto, que aquí es `undefined` a propósito. Mi hook `useSesion` lo revisa y lanza un error claro: *"useSesion debe usarse dentro de `<ProveedorSesion>`"*. Sin esa revisión, el error saldría después como `Cannot read properties of undefined`, lejos de la causa real y difícil de rastrear.

## Ejercicio 2

**¿Dónde se guarda el token y qué riesgo tiene ese lugar?**

Se guarda en `localStorage` (llave `gimnasio.sesion`, junto con los datos del usuario). El riesgo es el **XSS**: cualquier JavaScript que corra en la página, sea de una vulnerabilidad nuestra o de una librería comprometida, puede hacer `localStorage.getItem(...)` y robarse el token, y con él se hace pasar por la persona hasta que expire. Además, `localStorage` no se borra solo: el token se queda aunque se cierre el navegador. La alternativa más segura es una cookie `HttpOnly`, que JavaScript no puede leer, pero entonces el backend tiene que manejarla (y hay que cuidar el CSRF). Para esta práctica se usa `localStorage` porque es lo que pide el ejercicio.

