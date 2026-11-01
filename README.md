## Ejercicio 1 – Mis inscripciones, solo con sesión

### ¿La ruta protegida hace segura la aplicación? ¿Qué es lo que realmente protege los datos?

No del todo, porque la ruta protegida solo evita que se pueda entrar a la pantalla sin iniciar sesión. Lo que realmente protege los datos es el backend, que revisa el token JWT en cada petición y responde con un error 401 si el token no es válido.

## Ejercicio 2 – Inscribirse y el error 401

### ¿Por qué no se manda el miembroId al inscribirse?

Porque el backend obtiene el miembroId directamente del token JWT. Si se mandara desde el cliente, alguien podría cambiar ese dato e intentar inscribirse con la cuenta de otra persona.

### ¿Qué diferencia hay entre un 401 y un 403?

- **401:** Significa que no se ha iniciado sesión correctamente o que el token no es válido.
- **403:** Significa que el usuario sí está identificado, pero no tiene los permisos necesarios para realizar la acción, por ejemplo, si su cuenta no tiene el rol de miembro.

## Ejercicio 3 – Carga por ruta e imágenes

Las páginas se importan con `React.lazy` y el layout muestra `Cargando…` mientras descarga el módulo de la ruta. El catálogo usa `loading="lazy"` en cada imagen.

`npm run build` genera `dist/index.html`, `assets/index-<hash>.css` (6.49 kB), `assets/index-<hash>.js` (320.63 kB; 105.01 kB gzip), un chunk compartido `MensajeError` (0.24 kB) y chunks bajo demanda: `PaginaClases` (1.37 kB), `PaginaClase` (2.42 kB), `PaginaEntrar` (1.22 kB), `PaginaRegistro` (1.42 kB), `PaginaMisInscripciones` (1.20 kB) y `NoEncontrado` (0.45 kB). Los hashes varían entre builds. Antes de dividir por ruta, Vite generaba un único bundle JavaScript de 325.99 kB (106.10 kB gzip). El bundle inicial bajó 5.36 kB (1.09 kB gzip); los chunks de cada ruta se descargan al visitarla.

El ahorro inicial de imágenes depende del tamaño de ventana y del umbral lazy del navegador: se difieren las imágenes fuera de pantalla. El catálogo tiene 8 imágenes con un total de 174,998 bytes; la transferencia inicial ahorra los bytes de las que no se solicitan hasta desplazarse, entre 0 y 174,998 bytes según cuántas entren en el área visible o cercana. El ahorro parece pequeño porque son solo ocho imágenes compactas (alrededor de 22 kB cada una). `loading="lazy"` retrasa la descarga, no reduce el tamaño de los archivos.

El API permite CORS desde `http://localhost:5173`, que es el puerto de desarrollo. `vite preview` usa el puerto 4173 por defecto, por lo que el navegador envía las peticiones desde un origen que el backend no permite y las bloquea por CORS. Para revisar el build con este backend, inicia preview en 5173 (`.\\node_modules\\.bin\\vite.cmd preview --host 127.0.0.1 --port 5173`).

## Ejercicio 4 – Store de inscripciones

Zustand mantiene la lista de inscripciones, su carga y sus errores en un store compartido. Al iniciar o restaurar sesión se carga la lista; al cerrar sesión se vacía. El encabezado muestra la cantidad, el detalle identifica los horarios inscritos y la página «Mis inscripciones» consume el mismo estado.

### ¿Cuándo conviene un contexto y cuándo un store?

Conviene Context para datos estables que se comparten en una parte concreta del árbol, como la sesión y sus acciones. Un store conviene para estado que varias páginas consultan y actualizan de forma independiente, con acciones y suscripciones selectivas; evita pasar props por muchas capas y limita los renders a quienes usan el dato. Para estado local de una sola pantalla, basta `useState`.
