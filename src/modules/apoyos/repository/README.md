# `apoyos/repository/`

Repositories CRUD del módulo apoyos.

## Archivos

| Archivo | Modelo | Primary key |
|---|---|---|
| `tipo_apoyo.repository.js` | `TipoApoyo` | `id_tipo_apoyo` |
| `meta_apoyo.repository.js` | `MetaApoyo` | `id_meta` |
| `apoyo.repository.js` | `Apoyo` | `id_apoyo` |

Todos usan `createCrudRepository`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos/repository`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `apoyo.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `Apoyo` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `apoyo` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_apoyo` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `meta_apoyo.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `MetaApoyo` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `meta_apoyo` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_meta` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `tipo_apoyo.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `TipoApoyo` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `tipo_apoyo` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_tipo_apoyo` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |
<!-- FUNCTION_DOCS_END -->
