# `auth/schema/`

Define schemas Zod relacionados con auth, sesiones y logs.

## Archivos

| Archivo | Qué valida |
|---|---|
| `auth.schema.js` | Reexporta schemas de registro y login desde `shared/validation/flows.schema.js`. |
| `sesion_usuario.schema.js` | Payloads de sesión para uso interno o futuro router. |
| `logs.schema.js` | Payloads de logs para uso interno o futuro router. |

## Schemas públicos usados por router

| Schema | Endpoint |
|---|---|
| `registrarCreadorSchema` | `POST /api/auth/registro/creador` |
| `registrarSeguidorSchema` | `POST /api/auth/registro/seguidor` |
| `loginSchema` | `POST /api/auth/login` |

## Registro de creador

Espera:

```json
{
  "usuario": {
    "nombre": "string requerido",
    "email": "email válido",
    "password": "mínimo 8 caracteres",
    "url_imagen_portada": "url opcional",
    "imagen_perfil": "url opcional"
  },
  "perfil_creador": {
    "nombre_publico": "string requerido",
    "biografia": "texto opcional",
    "foto_perfil_url": "url opcional",
    "banner_url": "url opcional"
  }
}
```

## Registro de seguidor

Espera:

```json
{
  "usuario": {
    "nombre": "string requerido",
    "email": "email válido",
    "password": "mínimo 8 caracteres"
  },
  "perfil_seguidor": {
    "nombre_visible": "string requerido"
  }
}
```

## Login

Espera:

```json
{
  "email": "email válido",
  "password": "mínimo 8 caracteres"
}
```

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/auth/schema`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `auth.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `loginSchema` | Valida credenciales de inicio de sesión. | Asegura email válido y contraseña con longitud mínima antes de llamar al service. |
| `registrarCreadorSchema` | Valida registro transaccional de usuario creador y perfil creador. | Garantiza que el alta de creador sea completa y coherente. |
| `registrarSeguidorSchema` | Valida registro transaccional de usuario seguidor y perfil seguidor. | Garantiza que el alta de seguidor sea completa y coherente. |

### `logs.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createLogsSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateLogsSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `logsIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `logsListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `sesion_usuario.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createSesionUsuarioSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSesionUsuarioSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `sesionUsuarioIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `sesionUsuarioListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.
<!-- FUNCTION_DOCS_END -->
