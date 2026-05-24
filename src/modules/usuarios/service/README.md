# `usuarios/service/`

Contiene services CRUD para usuarios, perfiles y relaciones.

## Archivos

| Archivo | Repository usado | Entity name |
|---|---|---|
| `usuario.service.js` | `usuario.repository.js` | `usuario` |
| `perfil_creador.service.js` | `perfil_creador.repository.js` | `perfil_creador` |
| `perfil_seguidor.service.js` | `perfil_seguidor.repository.js` | `perfil_seguidor` |
| `creador_favorito.service.js` | `creador_favorito.repository.js` | `creador_favorito` |
| `creador_seguido.service.js` | `creador_seguido.repository.js` | `creador_seguido` |

Todos usan `createCrudService`.

## Métodos disponibles

```js
create(payload)
update(idOrParams, payload)
get(idOrParams)
list(query)
```

## Nota

Aunque algunos services tienen `create`, no significa que exista endpoint público para crear esa entidad. La exposición HTTP depende del router.
