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
