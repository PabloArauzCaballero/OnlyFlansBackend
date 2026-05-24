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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `middlewares`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `actionLog.middleware.js`: auditoría automática de requests HTTP

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sanitizeValue(value)` | Recorre objetos/arrays y reemplaza claves sensibles (`password`, `token`, `authorization`, etc.) por `[REDACTED]`. | Cualquier valor de params/query/body. | Copia sanitizada del valor. | Permite registrar auditoría sin filtrar secretos en logs persistidos. |
| `shouldSkip(req)` | Decide si una ruta debe omitirse de auditoría. Hoy omite `/health`. | Request Express. | Boolean. | Evita llenar la tabla de logs con health checks repetitivos. |
| `actionLogMiddleware(req, res, next)` | Crea `req.actionLog`, escucha `res.on("finish")`, arma metadata final y llama `LogsService.recordAction`. | Request, response y `next`. | Continúa el request y luego persiste log cuando termina la respuesta. | Captura status code real, duración y datos finales sin bloquear la respuesta principal. |

Detalle clave: usa `res.on("finish")` porque antes de terminar la respuesta todavía no se conoce el `statusCode` definitivo.


### `jwtMiddleware.js`: protección de rutas privadas

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `requireAuth(req, res, next)` | Busca token en header `Authorization: Bearer ...` o cookie `access_token`, verifica JWT, valida `tokenUse`, exige `id_usuario` e `id_sesion`, confirma sesión activa en DB y carga `req.user`/`req.session`. | Request Express con headers/cookies. | `next()` si es válido; `401` si falta, está vencido, es inválido o la sesión ya no está activa. | No basta con que el JWT sea válido: también se verifica sesión abierta para poder cerrar sesiones desde backend. |

Campos que agrega si todo sale bien:

```js
req.user = { id_usuario, nombre, email, rol, role, tokenUse };
req.session = { id_sesion };
```


### `validate.middleware.js`: validación Zod reutilizable

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `validateBody(schema, loggerObj, eventName)` | Genera un middleware que valida `req.body` con `schema.safeParse`. | Schema Zod, logger opcional y nombre de evento. | Si falla responde `400`; si pasa reemplaza `req.body` con datos parseados y llama `next()`. | Hace que los controllers reciban datos limpios y no repitan validación. |
| `validateParams(schema, loggerObj, eventName)` | Valida `req.params`. | Schema Zod para parámetros de ruta. | Responde `400` o reemplaza `req.params`. | Convierte ids de URL a tipos correctos antes del controller. |
| `validateQuery(schema, loggerObj, eventName)` | Valida `req.query`. | Schema Zod para filtros/paginación. | Responde `400` o reemplaza `req.query`. | Normaliza `limit`, `offset`, filtros y ordenamiento antes de llamar al service. |

Regla de diseño: la validación HTTP vive en routers/middlewares; los services no deberían volver a validar lo mismo, sino ejecutar negocio y persistencia.
<!-- FUNCTION_DOCS_END -->
