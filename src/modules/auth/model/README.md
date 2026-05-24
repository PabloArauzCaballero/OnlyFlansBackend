# `auth/model/`

Contiene modelos Sequelize relacionados con sesión y logs.

## Archivos

| Archivo | Tabla | Primary key | Uso |
|---|---|---|---|
| `sesion_usuario.model.js` | `onlyflans.sesion_usuario` | `id_sesion` | Guarda sesiones abiertas/cerradas por usuario. |
| `logs.model.js` | `onlyflans.logs` | `id_log` | Guarda acciones funcionales y auditoría HTTP. |

## `sesion_usuario`

Campos principales:

```txt
id_sesion
id_usuario
fecha_inicio
fecha_cierre
ip
user_agent
fecha_registro
fecha_actualizacion
version
estado_registro
```

## `logs`

Campos principales:

```txt
id_log
id_sesion
id_usuario
accion
metadata
fecha_registro
fecha_actualizacion
version
estado_registro
```

## Relación con auth

- Login crea sesión.
- Logout cierra sesión.
- `requireAuth` revisa que la sesión siga activa.
- `actionLog.middleware.js` y `LogsService.recordAction` insertan logs.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth/model`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `logs.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `Logs`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `Logs` sobre `onlyflans.logs`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_log | DataTypes.BIGINT | false | sí | sí | no |
| id_sesion | DataTypes.BIGINT | true | no | no | sí |
| accion | DataTypes.TEXT | true | no | no | no |
| metadata | DataTypes.JSONB | true | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |
| id_usuario | DataTypes.BIGINT | true | no | no | sí |

### `sesion_usuario.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `SesionUsuario`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `SesionUsuario` sobre `onlyflans.sesion_usuario`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_sesion | DataTypes.BIGINT | false | sí | sí | no |
| id_usuario | DataTypes.BIGINT | false | no | no | sí |
| fecha_inicio | DataTypes.DATE | false | no | no | no |
| fecha_cierre | DataTypes.DATE | true | no | no | no |
| ip | DataTypes.STRING(80) | true | no | no | no |
| user_agent | DataTypes.TEXT | true | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |
<!-- FUNCTION_DOCS_END -->
