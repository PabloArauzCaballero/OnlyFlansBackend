# `usuarios/schema/`

Define schemas Zod para usuarios, perfiles y relaciones.

## Archivos y campos principales

| Archivo | Create | Update | Params | Query |
|---|---|---|---|---|
| `usuario.schema.js` | Existe pero no está montado en router. | `nombre`, `email`, `password_hash`, `rol`, `ultimo_login`, imágenes, auditoría. | `id_usuario`. | `rol`, `email`, `nombre`, paginación. |
| `perfil_creador.schema.js` | Existe para uso interno/futuro. | `nombre_publico`, `biografia`, `foto_perfil_url`, `banner_url`, auditoría. | `id_usuario`. | `nombre_publico`, paginación. |
| `perfil_seguidor.schema.js` | Existe para uso interno/futuro. | `nombre_visible`, auditoría. | `id_usuario`. | `nombre_visible`, paginación. |
| `creador_favorito.schema.js` | `id_seguidor`, `id_creador`, `fecha_favorito`, auditoría. | Campos parciales. | `id_favorito`. | `id_seguidor`, `id_creador`, paginación. |
| `creador_seguido.schema.js` | `id_seguidor`, `id_creador`, `fecha_seguimiento`, auditoría. | Campos parciales. | `id_seguimiento`. | `id_seguidor`, `id_creador`, paginación. |

## Reglas importantes

- `creador_favorito` no permite que `id_seguidor === id_creador`.
- `creador_seguido` no permite que `id_seguidor === id_creador`.
- Los updates usan `requireAtLeastOneField`, por lo que no se acepta un body vacío.
- Los IDs usan coerción a número entero positivo.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios/schema`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `creador_favorito.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createCreadorFavoritoSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateCreadorFavoritoSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `creadorFavoritoIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `creadorFavoritoListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `creador_seguido.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createCreadorSeguidoSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateCreadorSeguidoSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `creadorSeguidoIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `creadorSeguidoListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `perfil_creador.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createPerfilCreadorSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updatePerfilCreadorSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `perfilCreadorIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `perfilCreadorListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `perfil_seguidor.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createPerfilSeguidorSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updatePerfilSeguidorSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `perfilSeguidorIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `perfilSeguidorListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `usuario.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createUsuarioSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateUsuarioSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `usuarioIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `usuarioListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.
<!-- FUNCTION_DOCS_END -->
