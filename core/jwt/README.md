# Carpeta `core/jwt/`

Contiene la lógica de generación y verificación de JWT.

## Archivo principal

| Archivo | Qué hace |
|---|---|
| `jwt.js` | Genera access token, refresh token y session token; también verifica access y refresh tokens. |

## Funciones exportadas

| Función | Recibe | Devuelve | Uso |
|---|---|---|---|
| `generateAccessToken(user)` | Usuario o payload con `id_usuario`, `email`, `rol`, etc. | JWT con `tokenUse: "access"`. | Login y autenticación de requests. |
| `generateRefreshToken(user)` | Usuario o payload. | JWT con `tokenUse: "refresh"`. | Renovación futura de sesión. |
| `generateSessionToken(sesion)` | Datos de sesión. | JWT con `tokenUse: "session"`. | Uso auxiliar si se requiere token de sesión. |
| `verifyAccessToken(token)` | JWT de acceso. | Payload decodificado o error. | `middlewares/jwtMiddleware.js`. |
| `verifyRefreshToken(token)` | JWT refresh. | Payload decodificado o error. | Flujo futuro de refresh. |

## Payload normalizado

`normalizeUserForToken()` transforma distintos nombres posibles en una forma estable:

```js
{
  sub: idUsuario,
  id_usuario: idUsuario,
  nombre,
  email,
  rol
}
```

El login agrega además `id_sesion` al payload antes de generar tokens. Esto es clave porque `requireAuth` exige que el token tenga usuario y sesión activa.

## Variables de entorno

| Variable | Uso |
|---|---|
| `JWT_ACCESS_SECRET` | Firma del access token. |
| `JWT_REFRESH_SECRET` | Firma del refresh token. |
| `SESSION_TOKEN` | Firma de token de sesión. |
| `JWT_ACCESS_EXPIRES_IN` | Expiración access. Por defecto `15m`. |
| `JWT_REFRESH_EXPIRES_IN` | Expiración refresh. Por defecto `7d`. |
| `SESSION_TOKEN_EXPIRES_IN` | Expiración session token. Por defecto `8h`. |

## Cuidado

No uses el mismo secreto para access, refresh y session. Deben ser secretos diferentes, largos y privados.
