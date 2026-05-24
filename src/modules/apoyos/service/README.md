# `apoyos/service/`

Services CRUD del módulo apoyos.

## Archivos

| Archivo | Repository usado | Entity name |
|---|---|---|
| `tipo_apoyo.service.js` | `tipo_apoyo.repository.js` | `tipo_apoyo` |
| `meta_apoyo.service.js` | `meta_apoyo.repository.js` | `meta_apoyo` |
| `apoyo.service.js` | `apoyo.repository.js` | `apoyo` |

Todos se construyen con `createCrudService`.

## Métodos disponibles

```js
create(payload)
update(idOrParams, payload)
get(idOrParams)
list(query)
```

## Regla

El service no calcula `monto_total_bs`; ese cálculo corresponde a la base de datos.
