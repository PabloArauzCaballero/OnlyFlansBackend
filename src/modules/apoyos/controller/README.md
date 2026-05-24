# `apoyos/controller/`

Controllers HTTP para tipos, metas y apoyos.

## Archivos

| Archivo | Funciones |
|---|---|
| `tipo_apoyo.controller.js` | `create`, `update`, `get`, `list`. |
| `meta_apoyo.controller.js` | `create`, `update`, `get`, `list`. |
| `apoyo.controller.js` | `create`, `update`, `get`, `list`. |

## Responsabilidad

Traducen HTTP a service y service a HTTP. Cada controller registra intento, éxito y fallo usando helpers de `src/shared/utils`.

## Qué recibe

Datos ya validados por Zod:

- `req.body` para create/update;
- `req.params` para operaciones por ID;
- `req.query` para listados.
