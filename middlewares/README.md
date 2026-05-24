# Carpeta `middlewares/`

Contiene middlewares globales o reutilizables de Express.

## Archivos

| Archivo | Qué hace | Recibe | Devuelve |
|---|---|---|---|
| `validate.middleware.js` | Valida `body`, `params` y `query` usando schemas Zod. | Schema, logger y nombre de evento. | Middleware Express que responde `400` o llama `next()`. |
| `jwtMiddleware.js` | Protege rutas con JWT y sesión activa. | Cookie `access_token` o header `Authorization`. | Si es válido, carga `req.user` y `req.session`; si no, responde `401`. |
| `actionLog.middleware.js` | Registra acciones HTTP al terminar la respuesta. | Request y response. | Persiste un registro en tabla `logs`, sanitizando datos sensibles. |

## Orden en `app.js`

Los middlewares globales principales se aplican antes de montar módulos:

```txt
pinoHttp
helmet
compression
cors
rateLimit
cookieParser
express.json
express.urlencoded
health check
REQUEST HIT log
actionLogMiddleware
module routers
```

## Validación

Los routers deben usar los validadores antes del controller:

```js
router.post(
  "/",
  validateBody(createSchema, logger, "entity_creation"),
  EntityController.create
);
```

Una vez que el request pasa el middleware, `req.body`, `req.params` o `req.query` quedan reemplazados por la versión parseada de Zod.

## Autenticación

`requireAuth` exige:

1. Token en cookie `access_token` o header Bearer.
2. Token con `tokenUse: "access"`.
3. Payload con `id_usuario` e `id_sesion`.
4. Sesión abierta, activa y existente en tabla `sesion_usuario`.

Si todo está bien, agrega:

```js
req.user = { id_usuario, nombre, email, rol, role, tokenUse };
req.session = { id_sesion };
```

## Auditoría

`actionLog.middleware.js` escucha `res.on("finish")`, por eso registra el status final real de la respuesta. Omite `/health` para evitar ruido.
