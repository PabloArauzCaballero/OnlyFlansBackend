# `publicaciones/repository/`

Repositories del módulo publicaciones.

## Archivos

| Archivo | Modelo | Primary key | Extra |
|---|---|---|---|
| `publicacion.repository.js` | `Publicacion` | `id_publicacion` | Agrega `createWithImages`. |
| `publicacion_imagen.repository.js` | `PublicacionImagen` | `id_publicacion_imagen` | CRUD estándar. |
| `comentario_publicacion.repository.js` | `ComentarioPublicacion` | `id_comentario` | CRUD estándar. |

## `createWithImages({ publicacion, imagenes })`

Abre una transacción Sequelize:

```txt
crear publicacion
  ↓
crear imágenes con id_publicacion recién generado
  ↓
commit si todo sale bien
rollback si algo falla
```

Esto evita que queden imágenes huérfanas o publicaciones incompletas.
