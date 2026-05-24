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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `index.js`

Este archivo no define funciones; exporta la configuración que `app.js` usa para montar el módulo.

| Export | Qué hace | Por qué existe |
|---|---|---|
| `moduleName` | Nombre lógico del módulo. | Permite construir rutas y logs consistentes. |
| `basePath` | Ruta base bajo `/api/...`. | Evita hardcodear rutas en `app.js`. |
| `router` | Router Express agregado del módulo. | Centraliza endpoints del módulo. |
<!-- FUNCTION_DOCS_END -->
