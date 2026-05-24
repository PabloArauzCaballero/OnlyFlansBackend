# `publicaciones/controller/`

Controllers HTTP para publicaciones, imágenes y comentarios.

## Archivos

| Archivo | Funciones |
|---|---|
| `publicacion.controller.js` | `create`, `createWithImages`, `update`, `get`, `list`. |
| `publicacion_imagen.controller.js` | `create`, `update`, `get`, `list`. |
| `comentario_publicacion.controller.js` | `create`, `update`, `get`, `list`. |

## `createWithImages`

Esta función existe solo en `publicacion.controller.js`. Recibe un body validado por `createWithImagesSchema` y llama a `PublicacionService.createWithImages`.

## Responsabilidad

El controller no abre transacciones. Solo coordina HTTP y service. La transacción vive más abajo, en repository.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones/controller`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `comentario_publicacion.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `publicacion.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `createWithImages` | Crea una publicación junto con sus imágenes asociadas. | Necesita transacción para evitar publicaciones sin imágenes o imágenes huérfanas si algo falla. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `publicacion_imagen.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.
<!-- FUNCTION_DOCS_END -->
