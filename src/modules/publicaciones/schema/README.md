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
