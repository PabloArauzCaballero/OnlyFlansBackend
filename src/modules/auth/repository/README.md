# `auth/repository/`

Contiene acceso a datos específico de autenticación, sesiones y logs.

## Archivos

| Archivo | Qué hace |
|---|---|
| `auth.repository.js` | Consultas y transacciones especiales de auth. |
| `sesion_usuario.repository.js` | Repository CRUD de sesiones + cierre de sesión. |
| `logs.repository.js` | Repository CRUD de logs. |

## `auth.repository.js`

Funciones principales:

| Función | Qué hace |
|---|---|
| `findActiveUserByEmail(email)` | Busca usuario activo por email. Incluye `password_hash` porque se necesita para login. |
| `findActiveUserById(idUsuario)` | Busca usuario activo por ID e incluye perfiles. Elimina `password_hash`. |
| `updateLastLogin(idUsuario)` | Actualiza `ultimo_login` y `fecha_actualizacion`. |
| `createCreatorAccount({ usuario, perfil_creador })` | Crea usuario + perfil creador en una transacción. |
| `createFollowerAccount({ usuario, perfil_seguidor })` | Crea usuario + perfil seguidor en una transacción. |

## Transacciones

El registro usa `sequelize.transaction` para garantizar que no exista usuario sin perfil o perfil sin usuario. Si falla la creación del perfil, se revierte también el usuario.

## `sesion_usuario.repository.js`

Además del CRUD genérico, tiene:

```js
closeSession({ id_sesion, id_usuario })
```

Marca la sesión como cerrada:

```txt
fecha_cierre = now()
fecha_actualizacion = now()
estado_registro = INACTIVO
```

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth/repository`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `auth.repository.js`

Funciones propias detectadas:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `findActiveUserByEmail` | Busca un usuario activo por email. | Login necesita recuperar usuario y hash sin listar usuarios inactivos. |
| `findActiveUserById` | Busca un usuario activo por id e incluye perfiles cuando aplica. | El endpoint `/me` necesita devolver información vigente del usuario autenticado. |
| `updateLastLogin` | Actualiza `ultimo_login` y `fecha_actualizacion` del usuario. | Sirve para auditoría y seguimiento del último acceso. |
| `createCreatorAccount` | Crea usuario y perfil creador dentro de una transacción. | Evita que exista usuario creador sin perfil si una parte falla. |
| `createFollowerAccount` | Crea usuario y perfil seguidor dentro de una transacción. | Evita que exista usuario seguidor sin perfil si una parte falla. |
| `removeSensitiveUserFields` | Ejecuta una responsabilidad interna del archivo. | Se mantiene como función separada para que el flujo sea más legible y reutilizable. |

### `logs.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `Logs` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `logs` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_log` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `sesion_usuario.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `SesionUsuario` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `sesion_usuario` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_sesion` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

Funciones propias detectadas:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `closeSession` | Marca una sesión como cerrada actualizando `fecha_cierre`. | Permite invalidar sesiones en base de datos aunque el token todavía no haya expirado. |
<!-- FUNCTION_DOCS_END -->
