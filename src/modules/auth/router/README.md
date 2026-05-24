# `auth/router/`

Define las rutas HTTP públicas del módulo de autenticación.

## Archivo

| Archivo | Qué hace |
|---|---|
| `auth.router.js` | Declara rutas de registro, login, logout y usuario autenticado. |

## Rutas

```txt
POST /registro/creador
POST /registro/seguidor
POST /login
POST /logout
GET  /me
```

Como el módulo se monta en `/api/auth`, las rutas completas son:

```txt
POST /api/auth/registro/creador
POST /api/auth/registro/seguidor
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Qué recibe

- Registro/login reciben `req.body`.
- Logout/me reciben token por cookie o header.

## Qué entrega al controller

- En registro/login, `req.body` ya validado por Zod.
- En logout/me, `req.user` y `req.session` cargados por `requireAuth`.

## Por qué existe

El router mantiene el contrato HTTP separado del controller. Aquí se decide qué endpoint existe y qué validación/protección debe pasar antes de ejecutar lógica.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth/router`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `auth.router.js`

Este archivo no contiene reglas de negocio; conecta endpoints HTTP con validadores y controller.

| Método | Ruta local | Protegida | Validación aplicada | Controller final |
|---|---|---|---|---|
| POST | /registro/creador | no | validateBody(registrarCreadorSchema) | AuthController.registerCreator |
| POST | /registro/seguidor | no | validateBody(registrarSeguidorSchema) | AuthController.registerFollower |
| POST | /login | no | validateBody(loginSchema) | AuthController.login |
| POST | /logout | sí | sin validación local | AuthController.logout |
| GET | /me | sí | sin validación local | AuthController.me |

Por qué existe: mantiene la definición HTTP separada de la lógica de negocio. El router decide qué se valida y qué controller atiende; el controller no debería validar manualmente el body/params/query.
<!-- FUNCTION_DOCS_END -->
