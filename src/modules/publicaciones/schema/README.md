# `publicaciones/schema/`

Schemas Zod del módulo publicaciones.

## Archivos

| Archivo | Create espera | Query permite |
|---|---|---|
| `publicacion.schema.js` | Para texto: `id_creador`, `texto`, `fecha_publicacion`. Para `con-imagenes`: `id_creador`, `texto` opcional, `imagenes[]`. | `id_creador`, paginación. |
| `publicacion_imagen.schema.js` | `id_publicacion`, `link_imagen`, `orden`. | `id_publicacion`, `orden`, paginación. |
| `comentario_publicacion.schema.js` | `id_publicacion`, `id_seguidor`, `comentario`, `fecha_comentario`. | `id_publicacion`, `id_seguidor`, paginación. |

## `POST /api/publicaciones/con-imagenes`

Espera:

```json
{
  "id_creador": 1,
  "texto": "Texto opcional",
  "imagenes": [
    { "link_imagen": "https://example.com/1.jpg", "orden": 1 }
  ]
}
```

Reglas:

- `imagenes` debe tener al menos un elemento.
- `link_imagen` es obligatorio.
- `orden` es opcional, pero si se manda no puede repetirse.
- Si falta `orden`, el service asigna `index + 1`.

## Updates

Todos los updates usan `requireAtLeastOneField`, así que no aceptan body vacío.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones/schema`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `comentario_publicacion.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createComentarioPublicacionSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateComentarioPublicacionSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `comentarioPublicacionIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `comentarioPublicacionListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `publicacion.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `createWithImagesSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createPublicacionSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `createPublicacionWithImagesSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updatePublicacionSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `publicacionIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `publicacionListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `publicacion_imagen.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createPublicacionImagenSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updatePublicacionImagenSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `publicacionImagenIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `publicacionImagenListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.
<!-- FUNCTION_DOCS_END -->
