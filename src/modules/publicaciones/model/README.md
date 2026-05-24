# `publicaciones/model/`

Modelos Sequelize de publicaciones.

## Archivos

| Archivo | Tabla | Descripción |
|---|---|---|
| `publicacion.model.js` | `onlyflans.publicacion` | Publicación creada por un creador. |
| `publicacion_imagen.model.js` | `onlyflans.publicacion_imagen` | Imagen asociada a una publicación. |
| `comentario_publicacion.model.js` | `onlyflans.comentario_publicacion` | Comentario hecho por un seguidor. |

## Relaciones clave

```txt
publicacion.id_creador → perfil_creador.id_usuario
publicacion_imagen.id_publicacion → publicacion.id_publicacion
comentario_publicacion.id_publicacion → publicacion.id_publicacion
comentario_publicacion.id_seguidor → perfil_seguidor.id_usuario
```
