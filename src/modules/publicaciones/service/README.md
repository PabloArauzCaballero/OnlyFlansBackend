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
