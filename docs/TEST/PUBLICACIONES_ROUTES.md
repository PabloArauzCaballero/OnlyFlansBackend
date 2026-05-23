# Documentación de rutas - módulo Publicaciones

Base path del módulo:

```txt
/api/publicaciones
```

Todas las rutas usan `express.Router`, validación con Zod mediante `validateBody`, `validateParams` o `validateQuery`, y logging con `rootLogger.child({ module: "..." })`.

## Estructura estándar de respuesta

### Respuesta exitosa de creación o actualización

```json
{
  "success": true,
  "message": "Registro creado correctamente.",
  "data": {}
}
```

### Respuesta exitosa de listado

```json
{
  "success": true,
  "message": "Registros listados correctamente.",
  "data": {
    "count": 0,
    "rows": [],
    "limit": 20,
    "offset": 0
  },
  "pagination": {
    "count": 0,
    "limit": 20,
    "offset": 0
  }
}
```

### Error de validación Zod

```json
{
  "success": false,
  "message": "Datos inválidos.",
  "errors": {
    "formErrors": [],
    "fieldErrors": {}
  }
}
```

### Error cuando no existe el registro

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No se encontró el registro de publicacion."
}
```

---

# 1. Publicaciones

## 1.1. Crear publicación simple

```http
POST /api/publicaciones
```

Crea una publicación en la tabla `onlyflans.publicacion`.

Esta ruta sirve para crear una publicación sin registrar imágenes en la misma petición. Si necesitas crear la publicación y sus imágenes juntas, usa `POST /api/publicaciones/con-imagenes`.

### Body esperado

```json
{
  "id_creador": 1,
  "texto": "Nueva publicación del creador",
  "fecha_publicacion": "2026-05-23T10:30:00.000Z"
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_creador` | number | Sí | ID del usuario que tiene perfil de creador. Referencia a `perfil_creador.id_usuario`. |
| `texto` | string/null | No | Texto de la publicación. Si se envía, no puede estar vacío. |
| `fecha_publicacion` | datetime | No | Fecha de publicación. Si no se envía, la base de datos usa `NOW()`. |

### Respuesta exitosa `201`

```json
{
  "success": true,
  "message": "Registro creado correctamente.",
  "data": {
    "id_publicacion": "1",
    "id_creador": "1",
    "texto": "Nueva publicación del creador",
    "fecha_publicacion": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

### Errores comunes

| Código | Caso |
|---:|---|
| `400` | `id_creador` no fue enviado o no es un número positivo. |
| `400` | `texto` fue enviado vacío. |
| `500` | Error interno o violación de foreign key en base de datos. |

---

## 1.2. Crear publicación con imágenes

```http
POST /api/publicaciones/con-imagenes
```

Crea una publicación y sus imágenes relacionadas en una sola operación transaccional.

Si falla la creación de cualquier imagen, se revierte también la creación de la publicación. Esto evita que queden publicaciones creadas sin sus imágenes correspondientes.

### Body esperado

```json
{
  "id_creador": 1,
  "texto": "Miren este nuevo contenido",
  "fecha_publicacion": "2026-05-23T10:30:00.000Z",
  "imagenes": [
    {
      "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-1.png",
      "orden": 1
    },
    {
      "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-2.png",
      "orden": 2
    }
  ]
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_creador` | number | Sí | ID del creador. Debe existir en `perfil_creador.id_usuario`. |
| `texto` | string/null | No | Texto de la publicación. Si se envía, no puede estar vacío ni superar 5000 caracteres. |
| `fecha_publicacion` | datetime | No | Fecha de publicación. Si no se envía, la base de datos usa `NOW()`. |
| `imagenes` | array | Sí | Lista de imágenes que se crearán en `publicacion_imagen`. Debe tener al menos una imagen. |
| `imagenes[].link_imagen` | string | Sí | Link o ruta de la imagen. No puede estar vacío. |
| `imagenes[].orden` | number | No | Orden de visualización. Debe ser mayor a 0. Si no se envía, se asigna automáticamente según la posición en el array. |

### Validaciones importantes

- `imagenes` debe tener al menos un elemento.
- `link_imagen` no puede estar vacío.
- `orden` debe ser positivo.
- No se permite repetir `orden` dentro de la misma petición.
- El proceso es transaccional: publicación e imágenes se guardan juntas o no se guarda nada.

### Respuesta exitosa `201`

```json
{
  "success": true,
  "message": "Publicación creada con imágenes correctamente.",
  "data": {
    "id_publicacion": "1",
    "id_creador": "1",
    "texto": "Miren este nuevo contenido",
    "fecha_publicacion": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO",
    "imagenes": [
      {
        "id_publicacion_imagen": "1",
        "id_publicacion": "1",
        "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-1.png",
        "orden": 1,
        "fecha_registro": "2026-05-23T10:30:00.000Z",
        "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
        "version": 1,
        "estado_registro": "ACTIVO"
      },
      {
        "id_publicacion_imagen": "2",
        "id_publicacion": "1",
        "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-2.png",
        "orden": 2,
        "fecha_registro": "2026-05-23T10:30:00.000Z",
        "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
        "version": 1,
        "estado_registro": "ACTIVO"
      }
    ]
  }
}
```

### Errores comunes

| Código | Caso |
|---:|---|
| `400` | `imagenes` no fue enviado o está vacío. |
| `400` | `imagenes[].link_imagen` está vacío. |
| `400` | `imagenes[].orden` no es positivo. |
| `400` | Hay órdenes repetidos dentro de `imagenes`. |
| `500` | Error interno o violación de foreign key en base de datos. |

---

## 1.3. Actualizar publicación

```http
PUT /api/publicaciones/:id_publicacion
```

Actualiza una publicación existente.

Esta ruta solo actualiza datos de `publicacion`. No actualiza imágenes. Para administrar imágenes usa las rutas de `/api/publicaciones/imagenes`.

### Params

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_publicacion` | number | Sí | ID de la publicación a actualizar. |

### Body esperado

```json
{
  "texto": "Texto actualizado",
  "estado_registro": "ACTIVO"
}
```

### Campos actualizables

| Campo | Tipo | Descripción |
|---|---:|---|
| `id_creador` | number | Cambia el creador asociado. Debe existir en `perfil_creador`. |
| `texto` | string/null | Texto de la publicación. Si se envía, no puede estar vacío. |
| `fecha_publicacion` | datetime | Fecha de publicación. |
| `estado_registro` | string | `ACTIVO`, `INACTIVO` o `ELIMINADO`. |

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registro actualizado correctamente.",
  "data": {
    "id_publicacion": "1",
    "id_creador": "1",
    "texto": "Texto actualizado",
    "fecha_publicacion": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T11:00:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 1.4. Obtener publicación por ID

```http
GET /api/publicaciones/:id_publicacion
```

Obtiene una publicación por su identificador.

### Params

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_publicacion` | number | Sí | ID de la publicación. |

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registro obtenido correctamente.",
  "data": {
    "id_publicacion": "1",
    "id_creador": "1",
    "texto": "Texto de la publicación",
    "fecha_publicacion": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 1.5. Listar publicaciones

```http
GET /api/publicaciones
```

Lista publicaciones con paginación y filtros simples.

### Query params

| Query | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `limit` | number | No | Cantidad de registros. Máximo 100. Default 20. |
| `offset` | number | No | Desplazamiento para paginación. Default 0. |
| `search` | string | No | Búsqueda en campos textuales configurados por el repositorio. |
| `orderBy` | string | No | Campo por el cual ordenar. |
| `orderDir` | string | No | `ASC` o `DESC`. |
| `estado_registro` | string | No | `ACTIVO`, `INACTIVO` o `ELIMINADO`. |
| `id_creador` | number | No | Filtra publicaciones de un creador específico. |

### Ejemplo

```http
GET /api/publicaciones?id_creador=1&limit=10&offset=0&orderBy=fecha_publicacion&orderDir=DESC
```

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registros listados correctamente.",
  "data": {
    "count": 1,
    "rows": [
      {
        "id_publicacion": "1",
        "id_creador": "1",
        "texto": "Texto de la publicación",
        "fecha_publicacion": "2026-05-23T10:30:00.000Z",
        "fecha_registro": "2026-05-23T10:30:00.000Z",
        "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
        "version": 1,
        "estado_registro": "ACTIVO"
      }
    ],
    "limit": 10,
    "offset": 0
  },
  "pagination": {
    "count": 1,
    "limit": 10,
    "offset": 0
  }
}
```

---

# 2. Imágenes de publicaciones

Base path:

```txt
/api/publicaciones/imagenes
```

## 2.1. Crear imagen para una publicación existente

```http
POST /api/publicaciones/imagenes
```

Crea una imagen asociada a una publicación ya existente.

### Body esperado

```json
{
  "id_publicacion": 1,
  "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-3.png",
  "orden": 3
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_publicacion` | number | Sí | Publicación a la que pertenece la imagen. |
| `link_imagen` | string | Sí | Link o ruta de la imagen. No puede estar vacío. |
| `orden` | number | No | Orden de visualización. Debe ser mayor a 0. Default 1. |

### Respuesta exitosa `201`

```json
{
  "success": true,
  "message": "Registro creado correctamente.",
  "data": {
    "id_publicacion_imagen": "3",
    "id_publicacion": "1",
    "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-3.png",
    "orden": 3,
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 2.2. Actualizar imagen de publicación

```http
PUT /api/publicaciones/imagenes/:id_publicacion_imagen
```

Actualiza el link, orden o estado de una imagen.

### Params

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_publicacion_imagen` | number | Sí | ID de la imagen. |

### Body esperado

```json
{
  "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-3-editada.png",
  "orden": 1,
  "estado_registro": "ACTIVO"
}
```

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registro actualizado correctamente.",
  "data": {
    "id_publicacion_imagen": "3",
    "id_publicacion": "1",
    "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-3-editada.png",
    "orden": 1,
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T11:00:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 2.3. Obtener imagen por ID

```http
GET /api/publicaciones/imagenes/:id_publicacion_imagen
```

Obtiene una imagen de publicación por su ID.

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registro obtenido correctamente.",
  "data": {
    "id_publicacion_imagen": "3",
    "id_publicacion": "1",
    "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-3.png",
    "orden": 3,
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 2.4. Listar imágenes

```http
GET /api/publicaciones/imagenes
```

Lista imágenes de publicaciones.

### Query params

| Query | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `limit` | number | No | Cantidad de registros. Máximo 100. Default 20. |
| `offset` | number | No | Desplazamiento para paginación. Default 0. |
| `estado_registro` | string | No | `ACTIVO`, `INACTIVO` o `ELIMINADO`. |
| `id_publicacion` | number | No | Filtra imágenes de una publicación específica. |
| `orden` | number | No | Filtra por orden. |

### Ejemplo

```http
GET /api/publicaciones/imagenes?id_publicacion=1&orderBy=orden&orderDir=ASC
```

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registros listados correctamente.",
  "data": {
    "count": 2,
    "rows": [
      {
        "id_publicacion_imagen": "1",
        "id_publicacion": "1",
        "link_imagen": "https://cdn.onlyflans.com/publicaciones/img-1.png",
        "orden": 1,
        "fecha_registro": "2026-05-23T10:30:00.000Z",
        "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
        "version": 1,
        "estado_registro": "ACTIVO"
      }
    ],
    "limit": 20,
    "offset": 0
  },
  "pagination": {
    "count": 2,
    "limit": 20,
    "offset": 0
  }
}
```

---

# 3. Comentarios de publicaciones

Base path:

```txt
/api/publicaciones/comentarios
```

## 3.1. Crear comentario

```http
POST /api/publicaciones/comentarios
```

Crea un comentario de un seguidor sobre una publicación.

### Body esperado

```json
{
  "id_publicacion": 1,
  "id_seguidor": 2,
  "comentario": "Excelente publicación"
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `id_publicacion` | number | Sí | ID de la publicación comentada. |
| `id_seguidor` | number | Sí | ID del perfil seguidor que comenta. |
| `comentario` | string | Sí | Comentario. No puede estar vacío. |
| `fecha_comentario` | datetime | No | Fecha del comentario. Si no se envía, la base de datos usa `NOW()`. |

### Respuesta exitosa `201`

```json
{
  "success": true,
  "message": "Registro creado correctamente.",
  "data": {
    "id_comentario": "1",
    "id_publicacion": "1",
    "id_seguidor": "2",
    "comentario": "Excelente publicación",
    "fecha_comentario": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 3.2. Actualizar comentario

```http
PUT /api/publicaciones/comentarios/:id_comentario
```

Actualiza un comentario existente.

### Body esperado

```json
{
  "comentario": "Comentario editado",
  "estado_registro": "ACTIVO"
}
```

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registro actualizado correctamente.",
  "data": {
    "id_comentario": "1",
    "id_publicacion": "1",
    "id_seguidor": "2",
    "comentario": "Comentario editado",
    "fecha_comentario": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T11:00:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 3.3. Obtener comentario por ID

```http
GET /api/publicaciones/comentarios/:id_comentario
```

Obtiene un comentario por su ID.

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registro obtenido correctamente.",
  "data": {
    "id_comentario": "1",
    "id_publicacion": "1",
    "id_seguidor": "2",
    "comentario": "Excelente publicación",
    "fecha_comentario": "2026-05-23T10:30:00.000Z",
    "fecha_registro": "2026-05-23T10:30:00.000Z",
    "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
    "version": 1,
    "estado_registro": "ACTIVO"
  }
}
```

---

## 3.4. Listar comentarios

```http
GET /api/publicaciones/comentarios
```

Lista comentarios con paginación y filtros.

### Query params

| Query | Tipo | Obligatorio | Descripción |
|---|---:|---:|---|
| `limit` | number | No | Cantidad de registros. Máximo 100. Default 20. |
| `offset` | number | No | Desplazamiento para paginación. Default 0. |
| `estado_registro` | string | No | `ACTIVO`, `INACTIVO` o `ELIMINADO`. |
| `id_publicacion` | number | No | Filtra comentarios por publicación. |
| `id_seguidor` | number | No | Filtra comentarios por seguidor. |

### Ejemplo

```http
GET /api/publicaciones/comentarios?id_publicacion=1&limit=10&offset=0
```

### Respuesta exitosa `200`

```json
{
  "success": true,
  "message": "Registros listados correctamente.",
  "data": {
    "count": 1,
    "rows": [
      {
        "id_comentario": "1",
        "id_publicacion": "1",
        "id_seguidor": "2",
        "comentario": "Excelente publicación",
        "fecha_comentario": "2026-05-23T10:30:00.000Z",
        "fecha_registro": "2026-05-23T10:30:00.000Z",
        "fecha_actualizacion": "2026-05-23T10:30:00.000Z",
        "version": 1,
        "estado_registro": "ACTIVO"
      }
    ],
    "limit": 10,
    "offset": 0
  },
  "pagination": {
    "count": 1,
    "limit": 10,
    "offset": 0
  }
}
```
