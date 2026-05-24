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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos/router`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `apoyo.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | ApoyoController.create |
| PUT | /:id_apoyo | no | validateParams(idSchema), validateBody(updateSchema) | ApoyoController.update |
| GET | /:id_apoyo | no | validateParams(idSchema) | ApoyoController.get |
| GET | / | no | validateQuery(querySchema) | ApoyoController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `meta_apoyo.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | MetaApoyoController.create |
| PUT | /:id_meta | no | validateParams(idSchema), validateBody(updateSchema) | MetaApoyoController.update |
| GET | /:id_meta | no | validateParams(idSchema) | MetaApoyoController.get |
| GET | / | no | validateQuery(querySchema) | MetaApoyoController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `tipo_apoyo.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | TipoApoyoController.create |
| PUT | /:id_tipo_apoyo | no | validateParams(idSchema), validateBody(updateSchema) | TipoApoyoController.update |
| GET | /:id_tipo_apoyo | no | validateParams(idSchema) | TipoApoyoController.get |
| GET | / | no | validateQuery(querySchema) | TipoApoyoController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.
<!-- FUNCTION_DOCS_END -->
