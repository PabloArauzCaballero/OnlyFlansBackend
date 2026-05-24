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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth/controller`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `auth.controller.js`

Este archivo recibe requests ya validados, llama al service y transforma el resultado en respuesta HTTP.

| Función | Qué hace | Por qué existe |
|---|---|---|
| `registerCreator` | Coordina el registro de un usuario con rol creador. | El alta debe crear usuario y perfil creador en un único caso de uso. |
| `registerFollower` | Coordina el registro de un usuario con rol seguidor. | El alta debe crear usuario y perfil seguidor en un único caso de uso. |
| `login` | Autentica credenciales, crea sesión, genera tokens y registra log. | Separa el caso de uso de autenticación de la capa HTTP. |
| `logout` | Cierra la sesión activa y registra log de salida. | Permite invalidar la sesión y mantener auditoría. |
| `me` | Devuelve datos del usuario autenticado usando información del token/sesión. | El frontend necesita confirmar sesión y cargar perfil actual. |
| `getCookieOptions` | Construye opciones seguras para cookies httpOnly. | Evita duplicar configuración entre access y refresh token. |
| `setAuthCookies` | Escribe cookies de access y refresh token en la respuesta. | Mantiene tokens fuera de localStorage y reduce exposición a JavaScript. |
| `clearAuthCookies` | Elimina cookies de autenticación. | Logout debe limpiar credenciales del navegador. |
| `sendServiceResponse` | Centraliza la traducción del resultado del service a una respuesta HTTP. | Evita duplicar en cada endpoint la lógica de `success`, `statusCode`, logs de éxito y logs de error controlado. |

Regla clave: el controller no debe repetir validaciones de Zod; para eso están los routers y `validate.middleware.js`. Su responsabilidad principal es orquestar request → service → response/logs.
<!-- FUNCTION_DOCS_END -->
