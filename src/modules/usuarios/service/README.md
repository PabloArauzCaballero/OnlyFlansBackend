# `usuarios/service/`

Contiene services CRUD para usuarios, perfiles y relaciones.

## Archivos

| Archivo | Repository usado | Entity name |
|---|---|---|
| `usuario.service.js` | `usuario.repository.js` | `usuario` |
| `perfil_creador.service.js` | `perfil_creador.repository.js` | `perfil_creador` |
| `perfil_seguidor.service.js` | `perfil_seguidor.repository.js` | `perfil_seguidor` |
| `creador_favorito.service.js` | `creador_favorito.repository.js` | `creador_favorito` |
| `creador_seguido.service.js` | `creador_seguido.repository.js` | `creador_seguido` |

Todos usan `createCrudService`.

## Métodos disponibles

```js
create(payload)
update(idOrParams, payload)
get(idOrParams)
list(query)
```

## Nota

Aunque algunos services tienen `create`, no significa que exista endpoint público para crear esa entidad. La exposición HTTP depende del router.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios/service`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `creador_favorito.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `CreadorFavoritoRepository` | Capa de persistencia usada por el service. |
| `entityName` | `creador_favorito` | Nombre usado en mensajes y logs. |
| `serviceName` | `creador_favorito.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `creador_seguido.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `CreadorSeguidoRepository` | Capa de persistencia usada por el service. |
| `entityName` | `creador_seguido` | Nombre usado en mensajes y logs. |
| `serviceName` | `creador_seguido.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `perfil_creador.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `PerfilCreadorRepository` | Capa de persistencia usada por el service. |
| `entityName` | `perfil_creador` | Nombre usado en mensajes y logs. |
| `serviceName` | `perfil_creador.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `perfil_seguidor.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `PerfilSeguidorRepository` | Capa de persistencia usada por el service. |
| `entityName` | `perfil_seguidor` | Nombre usado en mensajes y logs. |
| `serviceName` | `perfil_seguidor.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `usuario.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `UsuarioRepository` | Capa de persistencia usada por el service. |
| `entityName` | `usuario` | Nombre usado en mensajes y logs. |
| `serviceName` | `usuario.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |
<!-- FUNCTION_DOCS_END -->
