# `usuarios/controller/`

Contiene controllers HTTP para usuarios, perfiles, favoritos y seguimientos.

## Archivos

| Archivo | Funciones |
|---|---|
| `usuario.controller.js` | `create`, `update`, `get`, `list`. `create` existe pero no está montado en router. |
| `perfil_creador.controller.js` | `create`, `update`, `get`, `list`. `create` existe pero no está montado. |
| `perfil_seguidor.controller.js` | `create`, `update`, `get`, `list`. `create` existe pero no está montado. |
| `creador_favorito.controller.js` | `create`, `update`, `get`, `list`. |
| `creador_seguido.controller.js` | `create`, `update`, `get`, `list`. |

## Responsabilidad

Cada controller:

1. Define `startedAt` y `eventName`.
2. Registra intento con `sendAttemptingRequest`.
3. Llama al service.
4. Usa `sendServiceResponse` para responder status correcto.
5. Captura errores inesperados y responde `500`.

## Qué recibe

Recibe `req.params`, `req.body` y `req.query` ya validados por el router.

## Qué no debe hacer

- No debe acceder directamente a Sequelize.
- No debe duplicar validaciones de Zod.
- No debe construir SQL.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios/controller`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `creador_favorito.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `creador_seguido.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `perfil_creador.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `perfil_seguidor.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `usuario.controller.js`

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
