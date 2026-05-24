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
