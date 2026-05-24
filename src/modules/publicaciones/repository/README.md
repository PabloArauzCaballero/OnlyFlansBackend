# `publicaciones/repository/`

Repositories del módulo publicaciones.

## Archivos

| Archivo | Modelo | Primary key | Extra |
|---|---|---|---|
| `publicacion.repository.js` | `Publicacion` | `id_publicacion` | Agrega `createWithImages`. |
| `publicacion_imagen.repository.js` | `PublicacionImagen` | `id_publicacion_imagen` | CRUD estándar. |
| `comentario_publicacion.repository.js` | `ComentarioPublicacion` | `id_comentario` | CRUD estándar. |

## `createWithImages({ publicacion, imagenes })`

Abre una transacción Sequelize:

```txt
crear publicacion
  ↓
crear imágenes con id_publicacion recién generado
  ↓
commit si todo sale bien
rollback si algo falla
```

Esto evita que queden imágenes huérfanas o publicaciones incompletas.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones/repository`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `comentario_publicacion.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `ComentarioPublicacion` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `comentario_publicacion` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_comentario` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |

### `publicacion.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `Publicacion` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `publicacion` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_publicacion` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

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
| `createWithImages` | Crea una publicación junto con sus imágenes asociadas. | Necesita transacción para evitar publicaciones sin imágenes o imágenes huérfanas si algo falla. |
| `toPlain` | Convierte una instancia Sequelize o un objeto similar en un objeto plano. | Evita que controllers/services devuelvan objetos Sequelize completos y facilita serializar respuestas JSON limpias. |
| `removeUndefinedFields` | Elimina propiedades con valor `undefined` antes de enviar datos a la base. | Evita sobrescribir campos con valores indefinidos y deja que PostgreSQL/Sequelize apliquen defaults cuando corresponde. |

### `publicacion_imagen.repository.js`

Este archivo crea un repository concreto usando la factory compartida `createCrudRepository`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Model` | `PublicacionImagen` | Modelo Sequelize sobre el que operan las consultas. |
| `entity` | `publicacion_imagen` | Nombre usado para trazabilidad y mensajes internos. |
| `primaryKeys` | `id_publicacion_imagen` | Define cómo buscar/actualizar registros, incluyendo PK compuestas. |

Funciones generadas por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Inserta un registro. | Encapsula `Model.create`. |
| `get(idOrParams)` | Busca por primary key simple o compuesta. | Evita repetir `findByPk/findOne`. |
| `list(query)` | Lista con filtros, búsqueda, orden y paginación. | Da comportamiento uniforme a tablas del frontend. |
| `update(idOrParams, payload)` | Actualiza y devuelve la fila final. | Encapsula `Model.update` con `returning`. |
<!-- FUNCTION_DOCS_END -->
