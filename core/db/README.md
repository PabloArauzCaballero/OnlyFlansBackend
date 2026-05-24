# Carpeta `core/db/`

Contiene la configuración de base de datos y las asociaciones entre modelos Sequelize.

## Archivos

| Archivo | Qué hace | Recibe | Devuelve |
|---|---|---|---|
| `db.config.js` | Crea la instancia Sequelize con variables de entorno. | `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `PGPORT`, `PGSSLMODE`, `PGCHANNELBINDING`, `DB_LOGGING`. | `sequelize`, `connectDatabase()`, `closeDatabase()`. |
| `db.associations.js` | Importa modelos, instancia cada modelo con Sequelize, define relaciones y exporta modelos. | Instancia `sequelize`. | Modelos como `Usuario`, `PerfilCreador`, `Publicacion`, `Apoyo`, etc. |

## Flujo de conexión

`server.js` llama:

```js
await connectDatabase();
```

`connectDatabase()` ejecuta:

```js
sequelize.authenticate();
```

Si la conexión funciona, registra un log `database_connection_success`. Si falla, registra `database_connection_error` y relanza el error para impedir que el servidor arranque incompleto.

## Variables relevantes

| Variable | Uso |
|---|---|
| `PGHOST` | Host de PostgreSQL/Neon. |
| `PGPORT` | Puerto. Si no existe, usa `5432`. |
| `PGDATABASE` | Nombre de base de datos. |
| `PGUSER` | Usuario. |
| `PGPASSWORD` | Contraseña. |
| `PGSSLMODE` | Si es `require`, activa SSL. |
| `PGCHANNELBINDING` | Si es `require`, activa channel binding. |
| `DB_LOGGING` | Si es `true`, loguea SQL emitido por Sequelize. |

## Asociaciones

Las relaciones del dominio se centralizan en `db.associations.js` para evitar que cada modelo tenga que conocer todos los demás. Esto permite que los repositories importen modelos ya asociados desde un único punto.

Ejemplo de uso en un repository:

```js
const { Usuario } = require("../../../../core/db/db.associations");
```

## Cuidado

No ejecutes `sequelize.sync()` automáticamente en producción si ya tienes DDL controlado por SQL. Este proyecto trabaja con scripts en `docs/DB`, por lo que el modelo Sequelize debe reflejar la base, no reemplazarla sin control.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `core/db`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `db.associations.js`: registro de modelos y relaciones Sequelize

Este archivo no declara funciones normales; su trabajo es construir el objeto `models` y declarar asociaciones.

| Bloque | Qué hace | Por qué existe |
|---|---|---|
| Carga de modelos | Ejecuta cada factory de modelo pasando la instancia `sequelize`. | Sequelize necesita modelos inicializados antes de declarar relaciones. |
| `Usuario` ↔ `SesionUsuario` | Un usuario tiene muchas sesiones; cada sesión pertenece a un usuario. | Permite validar sesiones activas y consultar historial de sesiones. |
| `SesionUsuario` ↔ `Logs` | Una sesión puede tener varios logs; cada log puede estar asociado a una sesión. | Sirve para auditoría contextualizada por sesión. |
| `Usuario` ↔ `Logs` | Un usuario puede tener varios logs; un log puede pertenecer a un usuario. | Permite rastrear acciones aunque no siempre exista sesión. |
| `Usuario` ↔ `PerfilCreador` / `PerfilSeguidor` | Cada perfil depende de un usuario base. | Separa credenciales/datos generales de datos específicos por rol. |
| `PerfilCreador` ↔ `MetaApoyo` / `Apoyo` / `Publicacion` | Creador recibe apoyos, define metas y publica contenido. | Modela la parte creador del dominio OnlyFlans. |
| `PerfilSeguidor` ↔ `Apoyo` / `ComentarioPublicacion` | Seguidor realiza apoyos y comentarios. | Modela la interacción del usuario seguidor. |
| `Publicacion` ↔ `PublicacionImagen` / `ComentarioPublicacion` | Una publicación puede tener muchas imágenes y comentarios. | Permite contenido enriquecido sin limitar a una sola imagen. |
| `CreadorFavorito` / `CreadorSeguido` | Tablas puente entre seguidores y creadores. | Implementan relaciones muchos-a-muchos para favoritos y seguidos. |
| `module.exports = models` | Exporta todos los modelos ya asociados. | Evita importar modelos sueltos sin relaciones cargadas. |

Cuidado de arquitectura: los repositories deben importar modelos desde este archivo cuando necesitan asociaciones o modelos ya registrados, no desde cada archivo `.model.js` de forma aislada.


### `db.config.js`: conexión PostgreSQL/Neon con Sequelize

| Elemento | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sequelize` | Instancia única de Sequelize configurada con `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `PGPORT`, SSL y channel binding. | Variables de entorno. | Objeto usado por modelos, repositories y transacciones. | Centraliza la conexión para que todo el backend use el mismo pool. |
| `connectDatabase()` | Ejecuta `sequelize.authenticate()` y registra log de conexión exitosa o error fatal. | No recibe parámetros; usa `sequelize`. | Resuelve si conecta; lanza error si falla. | Permite que `server.js` no levante la API si la base no está disponible. |
| `closeDatabase()` | Ejecuta `sequelize.close()` y registra log de cierre. | No recibe parámetros. | Cierra el pool de conexiones. | Necesario para apagados controlados y evitar conexiones colgadas. |

Decisión importante: `DB_LOGGING=true` activa logs SQL mediante Pino. Por defecto queda desactivado para evitar ruido y exposición de queries en producción.
<!-- FUNCTION_DOCS_END -->
