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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `core/jwt`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `jwt.js`: generación y verificación de JWT

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `normalizeUserForToken(user)` | Normaliza diferentes nombres de campos de usuario (`id_usuario`, `idUsuario`, `id`, `sub`) a un payload estándar. | Objeto usuario. | Payload con `sub`, `id_usuario`, `nombre`, `email`, `rol`. | Evita que cada service tenga que recordar la forma exacta del token. |
| `generateAccessToken(user)` | Firma un JWT de acceso con `JWT_ACCESS_SECRET` y `tokenUse: "access"`. | Usuario normalizado o similar. | String JWT de corta duración. | Se usa para proteger rutas privadas sin consultar credenciales en cada request. |
| `generateRefreshToken(user)` | Firma un JWT de refresco con `JWT_REFRESH_SECRET` y `tokenUse: "refresh"`. | Usuario normalizado o similar. | String JWT de mayor duración. | Permite renovar sesión sin pedir email/password nuevamente. |
| `generateSessionToken(sesion)` | Firma un token de sesión con `SESSION_TOKEN` y `tokenUse: "session"`. | Identificador/datos de sesión. | String JWT de sesión. | Deja disponible un tipo de token separado para flujos internos de sesión. |
| `verifyAccessToken(token)` | Verifica firma y expiración usando `JWT_ACCESS_SECRET`. | JWT de acceso. | Payload decodificado o lanza error. | Lo usa `requireAuth` para autenticar requests privados. |
| `verifyRefreshToken(token)` | Verifica firma y expiración usando `JWT_REFRESH_SECRET`. | JWT refresh. | Payload decodificado o lanza error. | Se usaría en un endpoint de refresh si se habilita renovación de tokens. |

Motivo de tener secretos separados: un access token y un refresh token tienen riesgos y duraciones distintas; separarlos reduce impacto si una llave se compromete.
<!-- FUNCTION_DOCS_END -->
