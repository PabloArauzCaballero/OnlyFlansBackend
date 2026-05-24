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
