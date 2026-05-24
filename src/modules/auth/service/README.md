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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth/service`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `auth.service.js`

Funciones propias detectadas:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `registerCreator` | Coordina el registro de un usuario con rol creador. | El alta debe crear usuario y perfil creador en un único caso de uso. |
| `registerFollower` | Coordina el registro de un usuario con rol seguidor. | El alta debe crear usuario y perfil seguidor en un único caso de uso. |
| `login` | Autentica credenciales, crea sesión, genera tokens y registra log. | Separa el caso de uso de autenticación de la capa HTTP. |
| `logout` | Cierra la sesión activa y registra log de salida. | Permite invalidar la sesión y mantener auditoría. |
| `me` | Devuelve datos del usuario autenticado usando información del token/sesión. | El frontend necesita confirmar sesión y cargar perfil actual. |
| `normalizeUser` | Limpia el usuario antes de devolverlo al cliente o incluirlo en tokens. | Impide que datos sensibles como hashes de contraseña salgan de la capa interna. |
| `databaseErrorResult` | Convierte errores conocidos de Sequelize en respuestas controladas. | Evita exponer errores crudos de base de datos y entrega mensajes útiles con status HTTP apropiado. |
| `buildAuthTokens` | Ejecuta una responsabilidad interna del archivo. | Se mantiene como función separada para que el flujo sea más legible y reutilizable. |

### `logs.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `LogsRepository` | Capa de persistencia usada por el service. |
| `entityName` | `logs` | Nombre usado en mensajes y logs. |
| `serviceName` | `logs.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

Funciones propias detectadas:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `recordAction` | Registra una acción de auditoría en la tabla de logs. | Centraliza la creación de logs para middlewares y services. |

### `sesion_usuario.service.js`

Este archivo crea un service concreto usando la factory compartida `createCrudService`.

| Configuración | Valor | Por qué importa |
|---|---|---|
| `Repository` | `SesionUsuarioRepository` | Capa de persistencia usada por el service. |
| `entityName` | `sesion_usuario` | Nombre usado en mensajes y logs. |
| `serviceName` | `sesion_usuario.service` | Nombre del módulo para logger hijo. |

Funciones disponibles por la factory:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `create(payload)` | Limpia campos protegidos, crea y devuelve resultado estándar. | El controller recibe siempre `{ success, message, data }`. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload y actualiza. | Evita updates sobre registros inexistentes. |
| `get(idOrParams)` | Obtiene registro o devuelve 404 controlado. | Mantiene errores esperados fuera del handler global. |
| `list(query)` | Lista registros y agrega bloque `pagination`. | Facilita consumo desde tablas/listados del frontend. |

Funciones propias detectadas:

| Función | Qué hace | Por qué existe |
|---|---|---|
| `createForLogin` | Crea una sesión de usuario al iniciar sesión. | El login necesita una sesión persistida para que `requireAuth` pueda validarla. |
| `close` | Cierra una sesión existente. | Logout no debería borrar la sesión; debe dejar trazabilidad con fecha de cierre. |
<!-- FUNCTION_DOCS_END -->
