# `apoyos/service/`

Services CRUD del módulo apoyos.

## Archivos

| Archivo | Repository usado | Entity name |
|---|---|---|
| `tipo_apoyo.service.js` | `tipo_apoyo.repository.js` | `tipo_apoyo` |
| `meta_apoyo.service.js` | `meta_apoyo.repository.js` | `meta_apoyo` |
| `apoyo.service.js` | `apoyo.repository.js` | `apoyo` |

Todos se construyen con `createCrudService`.

## Métodos disponibles

```js
create(payload)
update(idOrParams, payload)
get(idOrParams)
list(query)
```

## Regla

El service no calcula `monto_total_bs`; ese cálculo corresponde a la base de datos.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos/service`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `apoyo.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `ApoyoRepository` | Capa de persistencia usada por el service. |
| `entityName` | `apoyo` | Nombre usado en mensajes y logs. |
| `serviceName` | `apoyo.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `meta_apoyo.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `MetaApoyoRepository` | Capa de persistencia usada por el service. |
| `entityName` | `meta_apoyo` | Nombre usado en mensajes y logs. |
| `serviceName` | `meta_apoyo.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `tipo_apoyo.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `TipoApoyoRepository` | Capa de persistencia usada por el service. |
| `entityName` | `tipo_apoyo` | Nombre usado en mensajes y logs. |
| `serviceName` | `tipo_apoyo.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |
<!-- FUNCTION_DOCS_END -->
