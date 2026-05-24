# Carpeta `core/`

Esta carpeta contiene infraestructura base del backend. Aquí no deberían vivir reglas de negocio del dominio, sino piezas técnicas reutilizables por toda la aplicación.

## Subcarpetas

| Carpeta | Qué contiene | Quién la usa |
|---|---|---|
| `db/` | Configuración Sequelize y asociaciones entre modelos. | `server.js`, repositories y modelos. |
| `jwt/` | Generación y verificación de tokens JWT. | Auth service y `jwtMiddleware`. |
| `redis/` | Conexión opcional a Redis. | `server.js` y helpers de cache. |
| `sha2/` | Helper simple de hash SHA-256. | Código que necesite hashing no relacionado con password. |

## Responsabilidad

`core` debe responder preguntas técnicas como:

- ¿Cómo conecto a la base de datos?
- ¿Cómo genero/verifico JWT?
- ¿Cómo conecto Redis?
- ¿Dónde se declaran asociaciones Sequelize?

No debe responder preguntas de negocio como:

- ¿Cómo se registra un creador?
- ¿Cómo se crea una publicación?
- ¿Qué validaciones tiene un apoyo?

Esas decisiones pertenecen a `src/modules` y `src/shared`.
