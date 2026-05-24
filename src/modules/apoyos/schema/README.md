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
