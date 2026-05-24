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
