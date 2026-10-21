# Gimnasio Titanes · frontend

Práctica 15. El catálogo de clases del gimnasio y el detalle de cada clase con sus horarios, usando React Router.

## Cómo correrlo

Antes hay que tener corriendo el backend (`gimnasio-backend`) en `http://localhost:3000`.

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173` y te manda directo a `/clases`.

## Ejercicio 1

**¿Por qué el 404 sí tiene encabezado y pie?**

Porque la ruta `*` está dentro de la ruta del `Layout`. El `Layout` siempre pinta el encabezado y el pie, y en medio, en el `<Outlet />`, pone la página que toque. Si la URL no coincide con nada, lo que toca es el 404. Si hubiera puesto la ruta `*` fuera del `Layout`, el 404 saldría solo, sin encabezado ni pie.

**¿Qué cambia en la pestaña Red si usas `<a href>` en lugar de `Link`?**

Con `<a href>` la página se recarga completa. En Red aparece primero el documento (`1`, tipo *document*) y luego se vuelven a pedir todos los scripts, el CSS y el logo: fueron 32 peticiones.

Con `Link` no se recarga nada. Solo sale la petición a la API para traer la clase (`1`, tipo *xhr*), y React cambia lo que se ve en pantalla.

La petición *xhr* sale dos veces porque en modo desarrollo el `StrictMode` ejecuta los efectos dos veces. En el build sale una sola.

Capturas: `evidencias/red-con-a-href.png` y `evidencias/red-con-link.png`.

## Ejercicio 2

**¿En qué tipo de dato llega el id de la URL y qué pasa si no lo conviertes?**

Llega como texto (`"1"`), aunque en la URL parezca número. Si no lo conviertes, TypeScript marca error porque `traerClase` pide un `number`. Y aunque lo dejaras pasar, cualquier cosa que hagas con el id falla: `"1" === 1` da `false` y `"1" + 1` da `"11"`. Por eso hago `Number(id)` antes de usarlo.

**¿Qué pasa al ir de `/clases/1` a `/clases/2` si el id no está en las dependencias del efecto?**

La URL cambia, pero se sigue viendo la clase 1. Las dos direcciones usan la misma ruta, así que React Router no vuelve a montar la página: nomás le cambia el parámetro. Si el efecto no tiene el id en sus dependencias, no se vuelve a ejecutar y nunca pide la clase 2.

## Evidencias

En la carpeta `evidencias/`:

- `catalogo.png`: el catálogo con las 8 clases.
- `detalle-horario-lleno.png`: Fuerza total, con el horario del viernes lleno.
- `404.png`: una dirección que no existe.
- `red-con-link.png` y `red-con-a-href.png`: la pestaña Red al abrir una clase de las dos formas.
