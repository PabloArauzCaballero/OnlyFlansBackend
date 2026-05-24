# Rutas del backend OnlyFlans

Documento actualizado según los routers reales del código.

Base local sugerida:

```txt
http://localhost:3000
```

> Nota: este backend usa Yarn. Para levantarlo: `yarn install --frozen-lockfile` y luego `yarn dev`.

---

## 1. Health

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/health` | No | Comprueba que Express está funcionando. |

Respuesta esperada:

```json
{
  "ok": true,
  "message": "Servidor funcionando correctamente"
}
```

---

## 2. Auth

Base path: `/api/auth`

| Método | Endpoint | Auth | Controller | Descripción |
|---|---|---|---|---|
| `POST` | `/api/auth/registro/creador` | No | `AuthController.registerCreator` | Crea usuario con rol `CREADOR` y perfil de creador. |
| `POST` | `/api/auth/registro/seguidor` | No | `AuthController.registerFollower` | Crea usuario con rol `SEGUIDOR` y perfil de seguidor. |
| `POST` | `/api/auth/login` | No | `AuthController.login` | Inicia sesión, crea registro de sesión y setea cookies. |
| `POST` | `/api/auth/logout` | Sí | `AuthController.logout` | Cierra la sesión activa y limpia cookies. |
| `GET` | `/api/auth/me` | Sí | `AuthController.me` | Obtiene usuario autenticado. |

### 2.1 Registrar creador

```http
POST /api/auth/registro/creador
Content-Type: application/json
```

Body:

```json
{
  "usuario": {
    "nombre": "Creador Demo",
    "email": "creador@test.com",
    "password": "Password123",
    "url_imagen_portada": "https://example.com/portada.jpg",
    "imagen_perfil": "https://example.com/perfil.jpg"
  },
  "perfil_creador": {
    "nombre_publico": "Creador Demo",
    "biografia": "Descripción pública",
    "foto_perfil_url": "https://example.com/foto.jpg",
    "banner_url": "https://example.com/banner.jpg"
  }
}
```

Comportamiento:

- Valida body con `registrarCreadorSchema`.
- Hashea la contraseña.
- Fuerza rol `CREADOR`.
- Crea usuario y perfil en una transacción.
- Registra log `REGISTRO_CREADOR`.
- Devuelve usuario sin `password_hash`.

### 2.2 Registrar seguidor

```http
POST /api/auth/registro/seguidor
Content-Type: application/json
```

Body:

```json
{
  "usuario": {
    "nombre": "Seguidor Demo",
    "email": "seguidor@test.com",
    "password": "Password123",
    "url_imagen_portada": "https://example.com/portada.jpg",
    "imagen_perfil": "https://example.com/perfil.jpg"
  },
  "perfil_seguidor": {
    "nombre_visible": "Seguidor Demo"
  }
}
```

Comportamiento:

- Valida body con `registrarSeguidorSchema`.
- Hashea la contraseña.
- Fuerza rol `SEGUIDOR`.
- Crea usuario y perfil en una transacción.
- Registra log `REGISTRO_SEGUIDOR`.

### 2.3 Login

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "creador@test.com",
  "password": "Password123"
}
```

Comportamiento:

- Busca usuario activo por email.
- Verifica contraseña.
- Crea sesión en `sesion_usuario`.
- Genera `accessToken` y `refreshToken`.
- Setea cookies HTTP-only.
- Registra log `LOGIN`.

### 2.4 Logout

```http
POST /api/auth/logout
Authorization: Bearer <accessToken>
```

También puede autenticarse mediante cookie `access_token`.

Comportamiento:

- Verifica access token.
- Verifica sesión activa.
- Cierra sesión.
- Limpia cookies.
- Registra log `LOGOUT`.

### 2.5 Me

```http
GET /api/auth/me
Authorization: Bearer <accessToken>
```

Devuelve usuario activo y perfiles relacionados.

### 2.6 Rutas NO expuestas

Actualmente no existen endpoints públicos para:

```txt
/api/auth/sesiones
/api/auth/logs
```

Sesiones y logs son usados internamente por auth y auditoría.

---

## 3. Usuarios

Base path: `/api/usuarios`

### 3.1 Usuario

| Método | Endpoint | Body/Query | Descripción |
|---|---|---|---|
| `GET` | `/api/usuarios` | Query estándar + `rol`, `email`, `nombre` | Lista usuarios. |
| `GET` | `/api/usuarios/:id_usuario` | Param `id_usuario` | Obtiene usuario por ID. |
| `PUT` | `/api/usuarios/:id_usuario` | Body parcial | Actualiza usuario. |

No existe `POST /api/usuarios` en router.

Body de update ejemplo:

```json
{
  "nombre": "Nuevo nombre",
  "imagen_perfil": "https://example.com/perfil.jpg"
}
```

### 3.2 Perfil creador

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/usuarios/perfiles-creadores` | Lista perfiles de creadores. |
| `GET` | `/api/usuarios/perfiles-creadores/:id_usuario` | Obtiene perfil de creador. |
| `PUT` | `/api/usuarios/perfiles-creadores/:id_usuario` | Actualiza perfil de creador. |

Body update:

```json
{
  "nombre_publico": "Nombre público actualizado",
  "biografia": "Nueva biografía",
  "foto_perfil_url": "https://example.com/foto.jpg",
  "banner_url": "https://example.com/banner.jpg"
}
```

### 3.3 Perfil seguidor

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/usuarios/perfiles-seguidores` | Lista perfiles de seguidores. |
| `GET` | `/api/usuarios/perfiles-seguidores/:id_usuario` | Obtiene perfil de seguidor. |
| `PUT` | `/api/usuarios/perfiles-seguidores/:id_usuario` | Actualiza perfil de seguidor. |

Body update:

```json
{
  "nombre_visible": "Nombre actualizado"
}
```

### 3.4 Creadores favoritos

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/usuarios/creadores-favoritos` | Marca creador como favorito. |
| `PUT` | `/api/usuarios/creadores-favoritos/:id_favorito` | Actualiza favorito. |
| `GET` | `/api/usuarios/creadores-favoritos/:id_favorito` | Obtiene favorito. |
| `GET` | `/api/usuarios/creadores-favoritos` | Lista favoritos. |

Body create:

```json
{
  "id_seguidor": 2,
  "id_creador": 1
}
```

Regla: `id_seguidor` no puede ser igual a `id_creador`.

### 3.5 Creadores seguidos

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/usuarios/creadores-seguidos` | Sigue a un creador. |
| `PUT` | `/api/usuarios/creadores-seguidos/:id_seguimiento` | Actualiza seguimiento. |
| `GET` | `/api/usuarios/creadores-seguidos/:id_seguimiento` | Obtiene seguimiento. |
| `GET` | `/api/usuarios/creadores-seguidos` | Lista seguimientos. |

Body create:

```json
{
  "id_seguidor": 2,
  "id_creador": 1
}
```

Regla: `id_seguidor` no puede ser igual a `id_creador`.

---

## 4. Apoyos

Base path: `/api/apoyos`

### 4.1 Tipos de apoyo

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/apoyos/tipos` | Crea tipo de apoyo. |
| `PUT` | `/api/apoyos/tipos/:id_tipo_apoyo` | Actualiza tipo de apoyo. |
| `GET` | `/api/apoyos/tipos/:id_tipo_apoyo` | Obtiene tipo de apoyo. |
| `GET` | `/api/apoyos/tipos` | Lista tipos de apoyo. |

Body create:

```json
{
  "codigo": "FLAN_TEST",
  "nombre": "Flan Test",
  "descripcion": "Tipo de apoyo de prueba",
  "monto_unitario_bs": "10.00"
}
```

Notas:

- `codigo` se transforma a mayúsculas.
- `monto_unitario_bs` debe ser positivo.

### 4.2 Metas de apoyo

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/apoyos/metas` | Crea meta de apoyo. |
| `PUT` | `/api/apoyos/metas/:id_meta` | Actualiza meta. |
| `GET` | `/api/apoyos/metas/:id_meta` | Obtiene meta. |
| `GET` | `/api/apoyos/metas` | Lista metas. |

Body create:

```json
{
  "id_creador": 1,
  "titulo": "Meta de prueba",
  "descripcion": "Descripción de la meta"
}
```

### 4.3 Apoyos

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/apoyos` | Crea apoyo. |
| `PUT` | `/api/apoyos/:id_apoyo` | Actualiza apoyo. |
| `GET` | `/api/apoyos/:id_apoyo` | Obtiene apoyo. |
| `GET` | `/api/apoyos` | Lista apoyos. |

Body create:

```json
{
  "id_seguidor": 2,
  "id_creador": 1,
  "id_tipo_apoyo": 1,
  "cantidad": 2,
  "monto_unitario_bs": "10.00",
  "mensaje": "Excelente contenido",
  "estado_pago": "SIMULADO_APROBADO"
}
```

Nota: no enviar `monto_total_bs`. Lo calcula PostgreSQL.

---

## 5. Publicaciones

Base path: `/api/publicaciones`

### 5.1 Publicaciones

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/publicaciones` | Crea publicación solo-texto. |
| `POST` | `/api/publicaciones/con-imagenes` | Crea publicación e imágenes en transacción. |
| `PUT` | `/api/publicaciones/:id_publicacion` | Actualiza publicación. |
| `GET` | `/api/publicaciones/:id_publicacion` | Obtiene publicación. |
| `GET` | `/api/publicaciones` | Lista publicaciones. |

Body solo-texto:

```json
{
  "id_creador": 1,
  "texto": "Primera publicación de prueba"
}
```

Body con imágenes:

```json
{
  "id_creador": 1,
  "texto": "Publicación con imágenes",
  "imagenes": [
    {
      "link_imagen": "https://example.com/imagen-1.jpg",
      "orden": 1
    },
    {
      "link_imagen": "https://example.com/imagen-2.jpg",
      "orden": 2
    }
  ]
}
```

Reglas de `con-imagenes`:

- Debe enviar al menos una imagen.
- Si se envía `orden`, no puede repetirse.
- Si no se envía `orden`, se asigna automáticamente según posición.

### 5.2 Imágenes

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/publicaciones/imagenes` | Crea imagen para una publicación existente. |
| `PUT` | `/api/publicaciones/imagenes/:id_publicacion_imagen` | Actualiza imagen. |
| `GET` | `/api/publicaciones/imagenes/:id_publicacion_imagen` | Obtiene imagen. |
| `GET` | `/api/publicaciones/imagenes` | Lista imágenes. |

Body create:

```json
{
  "id_publicacion": 1,
  "link_imagen": "https://example.com/extra.jpg",
  "orden": 3
}
```

### 5.3 Comentarios

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/publicaciones/comentarios` | Crea comentario. |
| `PUT` | `/api/publicaciones/comentarios/:id_comentario` | Actualiza comentario. |
| `GET` | `/api/publicaciones/comentarios/:id_comentario` | Obtiene comentario. |
| `GET` | `/api/publicaciones/comentarios` | Lista comentarios. |

Body create:

```json
{
  "id_publicacion": 1,
  "id_seguidor": 2,
  "comentario": "Buen contenido"
}
```

---

## 6. Query estándar para listados

Los endpoints de listado aceptan:

| Query | Descripción |
|---|---|
| `limit` | Máximo 100. Por defecto 20. |
| `offset` | Desplazamiento. Por defecto 0. |
| `search` | Búsqueda textual sobre campos string/text/citext. |
| `orderBy` | Campo de orden si existe en el modelo. |
| `orderDir` | `ASC` o `DESC`. |
| `estado_registro` | `ACTIVO`, `INACTIVO`, `ELIMINADO`. |

Ejemplo:

```http
GET /api/publicaciones?limit=10&offset=0&id_creador=1&orderBy=id_publicacion&orderDir=DESC
```

---

## 7. Respuestas estándar

### Éxito create

```json
{
  "success": true,
  "message": "Registro creado correctamente.",
  "data": {}
}
```

### Éxito list

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

### Error validación

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

### No encontrado

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No se encontró el registro de entidad."
}
```
