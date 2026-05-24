# `usuarios/repository/`

Contiene repositories CRUD que conectan services con modelos Sequelize.

## Archivos

| Archivo | Modelo | Primary key |
|---|---|---|
| `usuario.repository.js` | `Usuario` | `id_usuario` |
| `perfil_creador.repository.js` | `PerfilCreador` | `id_usuario` |
| `perfil_seguidor.repository.js` | `PerfilSeguidor` | `id_usuario` |
| `creador_favorito.repository.js` | `CreadorFavorito` | `id_favorito` |
| `creador_seguido.repository.js` | `CreadorSeguido` | `id_seguimiento` |

Todos usan `createCrudRepository`.

## Responsabilidad

- Ejecutar operaciones Sequelize.
- Devolver objetos planos.
- Aplicar filtros permitidos en listados.
- No conocer nada sobre `req` o `res`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios/repository`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `creador_favorito.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `CreadorFavorito` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `creador_favorito` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_favorito` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `creador_seguido.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `CreadorSeguido` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `creador_seguido` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_seguimiento` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `perfil_creador.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `PerfilCreador` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `perfil_creador` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_usuario` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `perfil_seguidor.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `PerfilSeguidor` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `perfil_seguidor` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_usuario` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `usuario.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `Usuario` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `usuario` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_usuario` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |
<!-- FUNCTION_DOCS_END -->
