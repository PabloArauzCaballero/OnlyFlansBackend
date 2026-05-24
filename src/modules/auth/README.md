# Módulo `auth`

Base path: `/api/auth`

Este módulo maneja la identidad del usuario: registro, login, logout y consulta del usuario autenticado. También contiene lógica interna para sesiones (`sesion_usuario`) y logs funcionales (`logs`), aunque esas dos entidades no están expuestas como rutas públicas en el estado actual del proyecto.

## Rutas expuestas

| Método | Ruta | Middleware | Controller | Qué hace |
|---|---|---|---|---|
| `POST` | `/api/auth/registro/creador` | `validateBody(registrarCreadorSchema)` | `registerCreator` | Crea usuario con rol `CREADOR` y perfil de creador en transacción. |
| `POST` | `/api/auth/registro/seguidor` | `validateBody(registrarSeguidorSchema)` | `registerFollower` | Crea usuario con rol `SEGUIDOR` y perfil de seguidor en transacción. |
| `POST` | `/api/auth/login` | `validateBody(loginSchema)` | `login` | Valida credenciales, crea sesión, genera tokens y cookies. |
| `POST` | `/api/auth/logout` | `requireAuth` | `logout` | Cierra sesión activa y borra cookies. |
| `GET` | `/api/auth/me` | `requireAuth` | `me` | Devuelve usuario autenticado y perfil asociado. |

## Flujo de registro

```txt
router/auth.router.js
  ↓ valida body
controller/auth.controller.js
  ↓ oculta password en logs
service/auth.service.js
  ↓ hashea password, fuerza rol y coordina transacción
repository/auth.repository.js
  ↓ crea usuario + perfil dentro de sequelize.transaction
PostgreSQL
```

## Flujo de login

```txt
POST /api/auth/login
  ↓
validar email/password
  ↓
buscar usuario activo por email
  ↓
verificar password
  ↓
crear sesión en sesion_usuario
  ↓
actualizar ultimo_login
  ↓
generar accessToken + refreshToken
  ↓
setear cookies HTTP-only
  ↓
registrar log LOGIN
```

## Nota sobre sesiones y logs

Existen estos archivos:

```txt
model/sesion_usuario.model.js
repository/sesion_usuario.repository.js
service/sesion_usuario.service.js
schema/sesion_usuario.schema.js
model/logs.model.js
repository/logs.repository.js
service/logs.service.js
schema/logs.schema.js
```

Pero no existen rutas montadas para `/api/auth/sesiones` ni `/api/auth/logs`. Se usan internamente para:

- abrir/cerrar sesiones al hacer login/logout;
- registrar acciones de usuario y acciones HTTP;
- validar sesión activa desde `requireAuth`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `index.js`

Este archivo no define funciones; exporta la configuración que `app.js` usa para montar el módulo.

| Export | Qué hace | Por qué existe |
|---|---|---|
| `moduleName` | Nombre lógico del módulo. | Permite construir rutas y logs consistentes. |
| `basePath` | Ruta base bajo `/api/...`. | Evita hardcodear rutas en `app.js`. |
| `router` | Router Express agregado del módulo. | Centraliza endpoints del módulo. |
<!-- FUNCTION_DOCS_END -->
