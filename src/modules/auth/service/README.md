# `auth/service/`

Contiene la lógica de negocio de autenticación, sesión y logs.

## Archivos

| Archivo | Qué hace |
|---|---|
| `auth.service.js` | Registro, login, logout y usuario autenticado. |
| `sesion_usuario.service.js` | CRUD interno de sesiones y helpers `createForLogin`, `close`. |
| `logs.service.js` | CRUD interno de logs y helper `recordAction`. |

## `auth.service.js`

### `registerCreator(payload)`

Recibe:

```json
{
  "usuario": {
    "nombre": "...",
    "email": "...",
    "password": "..."
  },
  "perfil_creador": {
    "nombre_publico": "..."
  }
}
```

Hace:

1. Hashea `usuario.password`.
2. Crea payload de usuario con `rol: "CREADOR"`.
3. Crea payload de perfil.
4. Llama a `AuthRepository.createCreatorAccount`.
5. Registra acción `REGISTRO_CREADOR`.
6. Devuelve usuario sin `password_hash`.

### `registerFollower(payload)`

Hace lo mismo, pero fuerza `rol: "SEGUIDOR"` y crea `perfil_seguidor`.

### `login({ email, password, ip, user_agent })`

Hace:

1. Busca usuario activo por email.
2. Verifica password.
3. Crea sesión con `SesionUsuarioService.createForLogin`.
4. Actualiza `ultimo_login`.
5. Genera `accessToken` y `refreshToken`.
6. Registra acción `LOGIN`.

### `logout({ id_usuario, id_sesion })`

Hace:

1. Cierra sesión si existe `id_sesion`.
2. Registra acción `LOGOUT`.
3. Devuelve sesión cerrada o `null`.

### `me(userFromToken)`

Busca usuario activo por ID e incluye perfiles relacionados.

## Regla

El service recibe datos ya validados por router. Su trabajo no es revisar si el email tiene formato correcto; su trabajo es coordinar reglas como hashing, sesión, tokens y transacciones.
