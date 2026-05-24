# `publicaciones/service/`

Services del módulo publicaciones.

## Archivos

| Archivo | Qué hace |
|---|---|
| `publicacion.service.js` | CRUD de publicaciones y caso especial `createWithImages`. |
| `publicacion_imagen.service.js` | CRUD de imágenes. |
| `comentario_publicacion.service.js` | CRUD de comentarios. |

## `createWithImages(payload)`

Recibe un payload ya validado:

```json
{
  "id_creador": 1,
  "texto": "Texto opcional",
  "imagenes": [
    { "link_imagen": "https://example.com/1.jpg", "orden": 1 }
  ]
}
```

Hace:

1. Limpia campos `undefined`.
2. Prepara payload de `publicacion`.
3. Prepara payload de imágenes.
4. Asigna `orden` automático si no llegó.
5. Llama a `PublicacionRepository.createWithImages`.
6. Devuelve publicación con array `imagenes`.

## Regla

El service no valida si `imagenes` está vacío ni si el orden se repite. Eso ya lo hizo Zod en router.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones/service`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `comentario_publicacion.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `ComentarioPublicacionRepository` | Capa de persistencia usada por el service. |
| `entityName` | `comentario_publicacion` | Nombre usado en mensajes y logs. |
| `serviceName` | `comentario_publicacion.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

### `publicacion.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `PublicacionRepository` | Capa de persistencia usada por el service. |
| `entityName` | `publicacion` | Nombre usado en mensajes y logs. |
| `serviceName` | `publicacion.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

Funciones propias detectadas:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `createWithImages` | Crea una publicación junto con sus imágenes asociadas. | Necesita transacción para evitar publicaciones sin imágenes o imágenes huérfanas si algo falla. |
| `removeUndefinedFields` | Elimina propiedades con valor `undefined` antes de enviar datos a la base. | Evita sobrescribir campos con valores indefinidos y deja que PostgreSQL/Sequelize apliquen defaults cuando corresponde. |

### `publicacion_imagen.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `PublicacionImagenRepository` | Capa de persistencia usada por el service. |
| `entityName` | `publicacion_imagen` | Nombre usado en mensajes y logs. |
| `serviceName` | `publicacion_imagen.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |
<!-- FUNCTION_DOCS_END -->
