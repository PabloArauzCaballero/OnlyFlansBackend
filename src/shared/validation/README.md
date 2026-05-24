# Carpeta `src/shared/validation/`

Contiene validaciones Zod reutilizables.

## Archivos

| Archivo | Qué hace |
|---|---|
| `common.schema.js` | Schemas base: IDs, strings, fechas, enums, auditoría y query de listado. |
| `flows.schema.js` | Schemas para flujos transaccionales que involucran más de una tabla. |

## `common.schema.js`

Incluye helpers como:

| Helper | Uso |
|---|---|
| `idBigIntSchema` | IDs positivos coercionados a número. |
| `requiredString(max)` | String obligatorio con trim y longitud máxima. |
| `optionalString(max)` | String opcional/nullable. |
| `requiredText()` | Texto obligatorio. |
| `optionalText()` | Texto opcional/nullable. |
| `optionalNonEmptyText()` | Texto opcional, pero si llega no puede estar vacío. |
| `optionalUrl()` | URL opcional/nullable. |
| `dateTimeSchema` | Fecha coercionada con Zod. |
| `decimalPositiveSchema` | Decimal positivo como número o string. |
| `listQuerySchema` | Query común de listados. |
| `requireAtLeastOneField(schema)` | Obliga que un update tenga al menos un campo. |

## Enums actuales

| Schema | Valores |
|---|---|
| `estadoRegistroSchema` | `ACTIVO`, `INACTIVO`, `ELIMINADO`. |
| `rolUsuarioSchema` | `CREADOR`, `SEGUIDOR`. |
| `estadoPagoSchema` | `PENDIENTE`, `SIMULADO_APROBADO`, `ANULADO`. |

## `flows.schema.js`

Valida payloads que no corresponden a una sola tabla, por ejemplo:

- registro de creador: `usuario + perfil_creador`;
- registro de seguidor: `usuario + perfil_seguidor`;
- login;
- publicación con imágenes;
- flujos transaccionales auxiliares.
