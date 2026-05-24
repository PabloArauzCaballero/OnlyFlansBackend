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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones/router`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `comentario_publicacion.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | ComentarioPublicacionController.create |
| PUT | /:id_comentario | no | validateParams(idSchema), validateBody(updateSchema) | ComentarioPublicacionController.update |
| GET | /:id_comentario | no | validateParams(idSchema) | ComentarioPublicacionController.get |
| GET | / | no | validateQuery(querySchema) | ComentarioPublicacionController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `publicacion.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | /con-imagenes | no | validateBody(createWithImagesSchema) | PublicacionController.createWithImages |
| POST | / | no | validateBody(createSchema) | PublicacionController.create |
| PUT | /:id_publicacion | no | validateParams(idSchema), validateBody(updateSchema) | PublicacionController.update |
| GET | /:id_publicacion | no | validateParams(idSchema) | PublicacionController.get |
| GET | / | no | validateQuery(querySchema) | PublicacionController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `publicacion_imagen.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | PublicacionImagenController.create |
| PUT | /:id_publicacion_imagen | no | validateParams(idSchema), validateBody(updateSchema) | PublicacionImagenController.update |
| GET | /:id_publicacion_imagen | no | validateParams(idSchema) | PublicacionImagenController.get |
| GET | / | no | validateQuery(querySchema) | PublicacionImagenController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.
<!-- FUNCTION_DOCS_END -->
