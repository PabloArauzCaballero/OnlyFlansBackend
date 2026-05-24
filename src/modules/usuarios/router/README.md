# `usuarios/router/`

Define rutas HTTP del módulo usuarios.

## Archivos

| Archivo | Rutas que define |
|---|---|
| `usuario.router.js` | `PUT /:id_usuario`, `GET /:id_usuario`, `GET /`. |
| `perfil_creador.router.js` | `PUT /:id_usuario`, `GET /:id_usuario`, `GET /`. |
| `perfil_seguidor.router.js` | `PUT /:id_usuario`, `GET /:id_usuario`, `GET /`. |
| `creador_favorito.router.js` | `POST /`, `PUT /:id_favorito`, `GET /:id_favorito`, `GET /`. |
| `creador_seguido.router.js` | `POST /`, `PUT /:id_seguimiento`, `GET /:id_seguimiento`, `GET /`. |

## Montaje en `usuarios/index.js`

```js
router.use("/perfiles-creadores", require("./router/perfil_creador.router"));
router.use("/perfiles-seguidores", require("./router/perfil_seguidor.router"));
router.use("/creadores-favoritos", require("./router/creador_favorito.router"));
router.use("/creadores-seguidos", require("./router/creador_seguido.router"));
router.use("/", require("./router/usuario.router"));
```

## Regla

El router siempre valida antes de controller:

```txt
validateParams → validateBody → controller.update
validateQuery → controller.list
```

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios/router`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `creador_favorito.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | CreadorFavoritoController.create |
| PUT | /:id_favorito | no | validateParams(idSchema), validateBody(updateSchema) | CreadorFavoritoController.update |
| GET | /:id_favorito | no | validateParams(idSchema) | CreadorFavoritoController.get |
| GET | / | no | validateQuery(querySchema) | CreadorFavoritoController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `creador_seguido.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | / | no | validateBody(createSchema) | CreadorSeguidoController.create |
| PUT | /:id_seguimiento | no | validateParams(idSchema), validateBody(updateSchema) | CreadorSeguidoController.update |
| GET | /:id_seguimiento | no | validateParams(idSchema) | CreadorSeguidoController.get |
| GET | / | no | validateQuery(querySchema) | CreadorSeguidoController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `perfil_creador.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| PUT | /:id_usuario | no | validateParams(idSchema), validateBody(updateSchema) | PerfilCreadorController.update |
| GET | /:id_usuario | no | validateParams(idSchema) | PerfilCreadorController.get |
| GET | / | no | validateQuery(querySchema) | PerfilCreadorController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `perfil_seguidor.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| PUT | /:id_usuario | no | validateParams(idSchema), validateBody(updateSchema) | PerfilSeguidorController.update |
| GET | /:id_usuario | no | validateParams(idSchema) | PerfilSeguidorController.get |
| GET | / | no | validateQuery(querySchema) | PerfilSeguidorController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.

### `usuario.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| PUT | /:id_usuario | no | validateParams(idSchema), validateBody(updateSchema) | UsuarioController.update |
| GET | /:id_usuario | no | validateParams(idSchema) | UsuarioController.get |
| GET | / | no | validateQuery(querySchema) | UsuarioController.list |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.
<!-- FUNCTION_DOCS_END -->
