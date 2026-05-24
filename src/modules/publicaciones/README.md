# Módulo `publicaciones`

Base path: `/api/publicaciones`

Administra publicaciones, imágenes de publicaciones y comentarios.

## Rutas expuestas

### Publicaciones

```txt
POST /api/publicaciones
POST /api/publicaciones/con-imagenes
PUT  /api/publicaciones/:id_publicacion
GET  /api/publicaciones/:id_publicacion
GET  /api/publicaciones
```

### Imágenes

```txt
POST /api/publicaciones/imagenes
PUT  /api/publicaciones/imagenes/:id_publicacion_imagen
GET  /api/publicaciones/imagenes/:id_publicacion_imagen
GET  /api/publicaciones/imagenes
```

### Comentarios

```txt
POST /api/publicaciones/comentarios
PUT  /api/publicaciones/comentarios/:id_comentario
GET  /api/publicaciones/comentarios/:id_comentario
GET  /api/publicaciones/comentarios
```

## Regla importante

`POST /api/publicaciones` es para publicaciones solo-texto y exige `texto`.

`POST /api/publicaciones/con-imagenes` crea una publicación y sus imágenes en una sola transacción. Este endpoint exige al menos una imagen y permite `texto` opcional no vacío.
