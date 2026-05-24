# `apoyos/router/`

Define rutas HTTP del módulo apoyos.

## Archivos

| Archivo | Rutas relativas |
|---|---|
| `tipo_apoyo.router.js` | `POST /`, `PUT /:id_tipo_apoyo`, `GET /:id_tipo_apoyo`, `GET /`. |
| `meta_apoyo.router.js` | `POST /`, `PUT /:id_meta`, `GET /:id_meta`, `GET /`. |
| `apoyo.router.js` | `POST /`, `PUT /:id_apoyo`, `GET /:id_apoyo`, `GET /`. |

## Montaje

En `apoyos/index.js`:

```js
router.use("/tipos", require("./router/tipo_apoyo.router"));
router.use("/metas", require("./router/meta_apoyo.router"));
router.use("/", require("./router/apoyo.router"));
```

## Validadores

Cada router usa:

- `validateBody(createSchema)` para POST;
- `validateParams(idSchema)` y `validateBody(updateSchema)` para PUT;
- `validateParams(idSchema)` para GET por ID;
- `validateQuery(querySchema)` para listados.
