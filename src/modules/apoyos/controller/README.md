# `apoyos/controller/`

Controllers HTTP para tipos, metas y apoyos.

## Archivos

| Archivo | Funciones |
|---|---|
| `tipo_apoyo.controller.js` | `create`, `update`, `get`, `list`. |
| `meta_apoyo.controller.js` | `create`, `update`, `get`, `list`. |
| `apoyo.controller.js` | `create`, `update`, `get`, `list`. |

## Responsabilidad

Traducen HTTP a service y service a HTTP. Cada controller registra intento, éxito y fallo usando helpers de `src/shared/utils`.

## Qué recibe

Datos ya validados por Zod:

- `req.body` para create/update;
- `req.params` para operaciones por ID;
- `req.query` para listados.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos/controller`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `apoyo.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `meta_apoyo.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create` | Crea un registro usando el service o repository correspondiente. | Mantiene el flujo estándar: el router valida, el controller recibe datos limpios y el service aplica la operación. |
| `update` | Actualiza un registro identificado por parámetros de ruta y datos del body. | Permite modificar una entidad sin mezclar validación HTTP, negocio y persistencia en una sola capa. |
| `get` | Obtiene un registro puntual usando su llave primaria o parámetros equivalentes. | Aísla la búsqueda individual y permite devolver 404 cuando el registro no existe. |
| `list` | Lista registros con filtros, búsqueda, ordenamiento y paginación cuando aplica. | Da una forma uniforme de consultar colecciones desde el frontend. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.

### `tipo_apoyo.controller.js`

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
