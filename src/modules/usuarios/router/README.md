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
