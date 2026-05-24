# `auth/controller/`

Contiene el controller HTTP de autenticación.

## Archivo

| Archivo | Funciones |
|---|---|
| `auth.controller.js` | `registerCreator`, `registerFollower`, `login`, `logout`, `me`. |

## Responsabilidad

El controller recibe `req` y `res`, llama al service correspondiente y responde JSON con el status adecuado.

No debe hacer consultas directas a DB. Tampoco debe repetir validaciones del schema.

## Detalles importantes

- Oculta contraseñas en logs usando `[REDACTED]`.
- En login, si el service devuelve éxito, setea cookies `access_token` y `refresh_token`.
- En logout, limpia cookies aunque el cierre de sesión sea coordinado por service.
- Usa helpers de logging para registrar intento, éxito y fallo.

## Cookies

Las cookies se configuran con:

| Opción | Valor |
|---|---|
| `httpOnly` | `true` |
| `secure` | `true` si `NODE_ENV=production` o `COOKIE_SECURE=true` |
| `sameSite` | `COOKIE_SAME_SITE` o `lax` |
| `path` | `/` |

## Qué recibe

| Función | Recibe |
|---|---|
| `registerCreator` | `req.body.usuario` y `req.body.perfil_creador`. |
| `registerFollower` | `req.body.usuario` y `req.body.perfil_seguidor`. |
| `login` | `req.body.email`, `req.body.password`, IP y user-agent. |
| `logout` | `req.user` y `req.session` desde `requireAuth`. |
| `me` | `req.user` y `req.session` desde `requireAuth`. |
