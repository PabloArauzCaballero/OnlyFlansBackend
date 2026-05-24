# `publicaciones/router/`

Define rutas HTTP del módulo publicaciones.

## Archivos

| Archivo | Rutas relativas |
|---|---|
| `publicacion.router.js` | `POST /con-imagenes`, `POST /`, `PUT /:id_publicacion`, `GET /:id_publicacion`, `GET /`. |
| `publicacion_imagen.router.js` | `POST /`, `PUT /:id_publicacion_imagen`, `GET /:id_publicacion_imagen`, `GET /`. |
| `comentario_publicacion.router.js` | `POST /`, `PUT /:id_comentario`, `GET /:id_comentario`, `GET /`. |

## Montaje

En `publicaciones/index.js`:

```js
router.use("/imagenes", require("./router/publicacion_imagen.router"));
router.use("/comentarios", require("./router/comentario_publicacion.router"));
router.use("/", require("./router/publicacion.router"));
```

El orden importa: primero se montan `/imagenes` y `/comentarios`, luego `/`. Así se evita que `/:id_publicacion` capture palabras como `imagenes` o `comentarios`.
