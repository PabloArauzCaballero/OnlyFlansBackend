# `apoyos/schema/`

Schemas Zod del módulo de apoyos.

## Archivos

| Archivo | Create espera | Query permite |
|---|---|---|
| `tipo_apoyo.schema.js` | `codigo`, `nombre`, `descripcion`, `monto_unitario_bs`. | `codigo`, `nombre`, paginación. |
| `meta_apoyo.schema.js` | `id_creador`, `titulo`, `descripcion`. | `id_creador`, `titulo`, paginación. |
| `apoyo.schema.js` | `id_seguidor`, `id_creador`, `id_tipo_apoyo`, `cantidad`, `monto_unitario_bs`, `mensaje`, `estado_pago`, `fecha_apoyo`. | `id_seguidor`, `id_creador`, `id_tipo_apoyo`, `estado_pago`, paginación. |

## Reglas

- `codigo` de tipo de apoyo se transforma a mayúscula.
- `cantidad` debe ser entero positivo.
- `monto_unitario_bs` debe ser decimal positivo.
- `estado_pago` solo acepta `PENDIENTE`, `SIMULADO_APROBADO` o `ANULADO`.
- `monto_total_bs` está prohibido en create/update porque lo calcula la base.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos/schema`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `apoyo.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createApoyoSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateApoyoSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `apoyoIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `apoyoListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `meta_apoyo.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createMetaApoyoSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateMetaApoyoSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `metaApoyoIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `metaApoyoListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.

### `tipo_apoyo.schema.js`

Este archivo define schemas Zod. No ejecuta negocio; valida forma, tipos y reglas básicas de entrada.

| Schema/export | Qué valida | Por qué existe |
|---|---|---|
| `createSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `idSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `querySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |
| `createTipoApoyoSchema` | Valida el body para crear registros. | Impide que lleguen datos incompletos o con tipo incorrecto al controller. |
| `updateTipoApoyoSchema` | Valida el body para actualizar registros, normalmente con campos parciales. | Permite updates seguros y evita requests vacíos cuando usa `requireAtLeastOneField`. |
| `tipoApoyoIdParamSchema` | Valida los parámetros de ruta que identifican el registro. | Convierte ids de string a número y evita consultar con ids inválidos. |
| `tipoApoyoListQuerySchema` | Valida query params de listado: paginación, filtros y orden. | Evita filtros inválidos y estandariza respuestas paginadas. |

Nota: los schemas de update usan `requireAtLeastOneField` para rechazar actualizaciones vacías.
<!-- FUNCTION_DOCS_END -->
