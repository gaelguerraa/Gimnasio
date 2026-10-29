## Ejercicio 1 – Mis inscripciones, solo con sesión

### ¿La ruta protegida hace segura la aplicación? ¿Qué es lo que realmente protege los datos?

No del todo, porque la ruta protegida solo evita que se pueda entrar a la pantalla sin iniciar sesión. Lo que realmente protege los datos es el backend, que revisa el token JWT en cada petición y responde con un error 401 si el token no es válido.

## Ejercicio 2 – Inscribirse y el error 401

### ¿Por qué no se manda el miembroId al inscribirse?

Porque el backend obtiene el miembroId directamente del token JWT. Si se mandara desde el cliente, alguien podría cambiar ese dato e intentar inscribirse con la cuenta de otra persona.

### ¿Qué diferencia hay entre un 401 y un 403?

- **401:** Significa que no se ha iniciado sesión correctamente o que el token no es válido.
- **403:** Significa que el usuario sí está identificado, pero no tiene los permisos necesarios para realizar la acción, por ejemplo, si su cuenta no tiene el rol de miembro.