# OnlyFlans Backend

Backend REST construido con **Node.js + Express + Sequelize + PostgreSQL/Neon + Zod + Pino**.

Este proyecto está organizado por módulos funcionales. Cada módulo agrupa sus entidades en carpetas de `router`, `controller`, `service`, `repository`, `model` y `schema` para mantener separado el flujo HTTP, la validación, la lógica de caso de uso, el acceso a datos y la definición ORM.

---

## 1. Resumen de arquitectura

La arquitectura sigue una estructura por capas:

```txt
Request HTTP
  ↓
app.js
  ↓
Middlewares globales
  ↓
src/modules/index.js
  ↓
Módulo específico: usuarios, auth, apoyos, publicaciones
  ↓
router/*.router.js
  ↓
middlewares/validate.middleware.js usando schemas Zod
  ↓
controller/*.controller.js
  ↓
service/*.service.js
  ↓
src/shared/service/createCrudService.js
  ↓
repository/*.repository.js
  ↓
src/shared/repository/createCrudRepository.js
  ↓
model/*.model.js Sequelize
  ↓
PostgreSQL / Neon
```

La idea central es que cada capa tenga una responsabilidad clara:

| Capa | Responsabilidad |
|---|---|
| `app.js` | Configura Express, middlewares globales, CORS, Helmet, compresión, rate limit y monta los módulos. |
| `router` | Declara las rutas HTTP y conecta validaciones Zod antes del controller. |
| `schema` | Define qué espera cada endpoint en `body`, `params` y `query`. Aquí vive la validación de entrada. |
| `controller` | Recibe la petición validada, llama al service, registra logs y arma la respuesta HTTP. |
| `service` | Coordina casos de uso. No repite validaciones del middleware. Puede coordinar transacciones o reglas de negocio reales. |
| `createCrudService` | Service global reutilizable para operaciones CRUD estándar. Maneja respuestas uniformes, errores de DB y not found. |
| `repository` | Acceso directo a datos. Llama a Sequelize y no contiene lógica HTTP. |
| `createCrudRepository` | Repository global reutilizable para `create`, `get`, `list` y `update`. |
| `model` | Define los modelos Sequelize según el DDL real. |
| `core/db/db.associations.js` | Centraliza modelos y asociaciones Sequelize. |

---

## 2. Flujo completo de una acción

Ejemplo: crear una publicación con imágenes.

### Endpoint

```http
POST /api/publicaciones/con-imagenes
```

### Flujo interno

```txt
Cliente/Postman/Frontend
  ↓
POST /api/publicaciones/con-imagenes
  ↓
app.js
  - pinoHttp asigna logger de request
  - helmet aplica headers de seguridad
  - compression comprime si corresponde
  - cors valida origen
  - rateLimit controla abuso
  - cookieParser lee cookies
  - express.json parsea JSON
  - actionLogMiddleware prepara metadatos de auditoría en req.actionLog
  ↓
src/modules/index.js
  ↓
src/modules/publicaciones/index.js
  ↓
src/modules/publicaciones/router/publicacion.router.js
  ↓
validateBody(createWithImagesSchema)
  - valida id_creador
  - valida texto opcional no vacío
  - valida array imagenes con al menos una imagen
  - valida link_imagen y orden
  - valida que no se repita orden si viene explícito
  ↓
PublicacionController.createWithImages
  - registra intento con sendAttemptingRequest
  - llama a PublicacionService.createWithImages(req.body)
  ↓
PublicacionService.createWithImages
  - NO repite validaciones de Zod
  - prepara payload de publicacion
  - prepara payload de imagenes
  - llama a PublicacionRepository.createWithImages
  ↓
PublicacionRepository.createWithImages
  - abre sequelize.transaction
  - crea registro en onlyflans.publicacion
  - crea registros relacionados en onlyflans.publicacion_imagen
  - si falla algo, rollback automático
  ↓
Sequelize models
  ↓
PostgreSQL / Neon
  ↓
Respuesta vuelve al controller
  ↓
Controller responde JSON con status 201
```

---

## 3. Decisión importante sobre validaciones

Las validaciones de forma del request se hacen en **Zod**, dentro de los archivos `schema/*.schema.js`, y se ejecutan desde los routers con:

```js
validateBody(schema, logger, eventName)
validateParams(schema, logger, eventName)
validateQuery(schema, logger, eventName)
```

Por eso los services fueron corregidos para no repetir validaciones como:

- campo requerido;
- formato de email;
- longitud máxima;
- valores permitidos por enum/check;
- campos positivos;
- payload vacío en update.

El service debe encargarse de coordinar el caso de uso, no de repetir lo que ya hizo el middleware. Si una regla requiere consultar base de datos, transacciones o cálculos de negocio, sí corresponde al service.

---

## 4. Documentos principales del backend

### Raíz del proyecto

| Archivo | Función |
|---|---|
| `server.js` | Punto de entrada. Carga `.env`, conecta la base de datos y levanta Express. También maneja apagado con `SIGTERM` y `SIGINT`. |
| `app.js` | Configura la aplicación Express: seguridad, CORS, parsers, logs, rate limit, health check, módulos, 404 y error handler global. |
| `package.json` | Define nombre del proyecto, scripts y dependencias necesarias. |
| `.env.example` | Plantilla de variables de entorno para correr local o en Neon. |
| `.gitignore` | Archivos/carpetas que no deben versionarse. |
| `README.md` | Documento principal de arquitectura, flujo y uso del backend. |

### `core/`

| Archivo | Función |
|---|---|
| `core/db/db.config.js` | Crea la instancia Sequelize usando variables `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, etc. Expone `connectDatabase`, `closeDatabase` y `sequelize`. |
| `core/db/db.associations.js` | Importa todos los modelos Sequelize, declara asociaciones `belongsTo`, `hasOne`, `hasMany` y `belongsToMany`, y exporta el objeto `models`. |
| `core/jwt/jwt.js` | Genera y verifica JWT de acceso, refresh y sesión usando `id_usuario`. |
| `core/sha2/sha2.js` | Helper de hash SHA-256. |

### `logs/`

| Archivo | Función |
|---|---|
| `logs/logger.js` | Configura Pino como logger principal del proyecto. Por defecto escribe en `./logs/app.log`. |

### `middlewares/`

| Archivo | Función |
|---|---|
| `middlewares/validate.middleware.js` | Middleware reutilizable para validar `body`, `params` y `query` con Zod. Si falla, responde 400. |
| `middlewares/jwtMiddleware.js` | Middleware `requireAuth` para validar token JWT desde header Bearer o cookie `access_token`. Carga `req.user` con `id_usuario`. |
| `middlewares/actionLog.middleware.js` | Prepara metadatos de auditoría en `req.actionLog`. Actualmente no inserta automáticamente en la tabla `logs`; deja los datos disponibles para un flujo posterior. |

### `src/shared/`

| Archivo/carpeta | Función |
|---|---|
| `src/shared/service/createCrudService.js` | Service global para CRUD estándar. Maneja respuestas uniformes, not found, errores de constraints y errores internos. |
| `src/shared/repository/createCrudRepository.js` | Repository global para Sequelize. Implementa `create`, `get`, `list`, `update`, filtros por query, paginación y búsqueda textual. |
| `src/shared/validation/common.schema.js` | Helpers Zod reutilizables: IDs, textos, enums, fechas, decimales, auditoría y query de listado. |
| `src/shared/validation/flows.schema.js` | Schemas recomendados para flujos transaccionales que afectan más de una tabla. |
| `src/shared/utils/*.js` | Helpers de logging, errores, conversión a plain object, metadata de request, comparación segura, etc. |

---

## 5. Módulos del backend

### 5.1. `src/modules/usuarios`

Maneja usuarios, perfiles y relaciones seguidor-creador.

Entidades:

- `usuario`
- `perfil_creador`
- `perfil_seguidor`
- `creador_favorito`
- `creador_seguido`

Base path:

```txt
/api/usuarios
```

Subrutas:

```txt
/api/usuarios
/api/usuarios/perfiles-creadores
/api/usuarios/perfiles-seguidores
/api/usuarios/creadores-favoritos
/api/usuarios/creadores-seguidos
```

### 5.2. `src/modules/auth`

Maneja sesiones y logs.

Entidades:

- `sesion_usuario`
- `logs`

Base path:

```txt
/api/auth
```

Subrutas:

```txt
/api/auth/sesiones
/api/auth/logs
```

### 5.3. `src/modules/apoyos`

Maneja tipos de apoyo, metas de apoyo y apoyos realizados.

Entidades:

- `tipo_apoyo`
- `meta_apoyo`
- `apoyo`

Base path:

```txt
/api/apoyos
```

Subrutas:

```txt
/api/apoyos
/api/apoyos/tipos
/api/apoyos/metas
```

### 5.4. `src/modules/publicaciones`

Maneja publicaciones, imágenes y comentarios.

Entidades:

- `publicacion`
- `publicacion_imagen`
- `comentario_publicacion`

Base path:

```txt
/api/publicaciones
```

Subrutas:

```txt
/api/publicaciones
/api/publicaciones/con-imagenes
/api/publicaciones/imagenes
/api/publicaciones/comentarios
```

---

## 6. Convención de respuestas

### Respuesta exitosa de creación

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

### Registro no encontrado

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No se encontró el registro de usuario."
}
```

### Error de constraint de base de datos

```json
{
  "success": false,
  "statusCode": 409,
  "message": "Ya existe un registro con valores únicos repetidos."
}
```

---

## 7. Rutas disponibles

Todas las rutas de entidades siguen el patrón:

```txt
POST   /recurso
PUT    /recurso/:id
GET    /recurso/:id
GET    /recurso
```

La excepción relevante es:

```txt
POST /api/publicaciones/con-imagenes
```

que crea una publicación y sus imágenes en una sola transacción.

### Health

```http
GET /health
```

Respuesta:

```json
{
  "ok": true,
  "message": "Servidor funcionando correctamente"
}
```

---

## 8. Detalle de endpoints por entidad

### Usuarios

#### `POST /api/usuarios`

Crea un usuario.

Body esperado:

```json
{
  "nombre": "Creador Demo",
  "email": "creador@test.com",
  "password_hash": "hash_seguro",
  "rol": "CREADOR",
  "url_imagen_portada": "https://example.com/portada.jpg",
  "imagen_perfil": "https://example.com/perfil.jpg"
}
```

Devuelve `data.id_usuario`.

#### `PUT /api/usuarios/:id_usuario`

Actualiza datos del usuario.

Body ejemplo:

```json
{
  "nombre": "Creador Demo Actualizado"
}
```

#### `GET /api/usuarios/:id_usuario`

Obtiene un usuario por ID.

#### `GET /api/usuarios?limit=20&offset=0&search=demo`

Lista usuarios con paginación y filtros.

---

### Perfiles de creadores

Base path:

```txt
/api/usuarios/perfiles-creadores
```

#### `POST /api/usuarios/perfiles-creadores`

Body:

```json
{
  "id_usuario": 1,
  "nombre_publico": "Creador Demo",
  "biografia": "Descripción pública",
  "foto_perfil_url": "https://example.com/foto.jpg",
  "banner_url": "https://example.com/banner.jpg"
}
```

#### `PUT /api/usuarios/perfiles-creadores/:id_usuario`

Body:

```json
{
  "biografia": "Nueva biografía"
}
```

#### `GET /api/usuarios/perfiles-creadores/:id_usuario`

Obtiene el perfil del creador.

#### `GET /api/usuarios/perfiles-creadores`

Lista perfiles de creadores.

---

### Perfiles de seguidores

Base path:

```txt
/api/usuarios/perfiles-seguidores
```

#### `POST /api/usuarios/perfiles-seguidores`

Body:

```json
{
  "id_usuario": 2,
  "nombre_visible": "Seguidor Demo"
}
```

#### `PUT /api/usuarios/perfiles-seguidores/:id_usuario`

Body:

```json
{
  "nombre_visible": "Seguidor Actualizado"
}
```

#### `GET /api/usuarios/perfiles-seguidores/:id_usuario`

Obtiene perfil de seguidor.

#### `GET /api/usuarios/perfiles-seguidores`

Lista perfiles de seguidores.

---

### Creadores favoritos

Base path:

```txt
/api/usuarios/creadores-favoritos
```

#### `POST /api/usuarios/creadores-favoritos`

Body:

```json
{
  "id_seguidor": 2,
  "id_creador": 1
}
```

Devuelve `data.id_favorito`.

#### `PUT /api/usuarios/creadores-favoritos/:id_favorito`

Body ejemplo:

```json
{
  "estado_registro": "INACTIVO"
}
```

#### `GET /api/usuarios/creadores-favoritos/:id_favorito`

Obtiene favorito.

#### `GET /api/usuarios/creadores-favoritos`

Lista favoritos.

---

### Creadores seguidos

Base path:

```txt
/api/usuarios/creadores-seguidos
```

#### `POST /api/usuarios/creadores-seguidos`

Body:

```json
{
  "id_seguidor": 2,
  "id_creador": 1
}
```

Devuelve `data.id_seguimiento`.

#### `PUT /api/usuarios/creadores-seguidos/:id_seguimiento`

Body ejemplo:

```json
{
  "estado_registro": "INACTIVO"
}
```

#### `GET /api/usuarios/creadores-seguidos/:id_seguimiento`

Obtiene seguimiento.

#### `GET /api/usuarios/creadores-seguidos`

Lista seguimientos.

---

### Sesiones

Base path:

```txt
/api/auth/sesiones
```

#### `POST /api/auth/sesiones`

Body:

```json
{
  "id_usuario": 1,
  "ip": "127.0.0.1",
  "user_agent": "Postman"
}
```

Devuelve `data.id_sesion`.

#### `PUT /api/auth/sesiones/:id_sesion`

Body:

```json
{
  "fecha_cierre": "2026-05-23T12:00:00.000Z"
}
```

#### `GET /api/auth/sesiones/:id_sesion`

Obtiene sesión.

#### `GET /api/auth/sesiones`

Lista sesiones.

---

### Logs

Base path:

```txt
/api/auth/logs
```

#### `POST /api/auth/logs`

Body:

```json
{
  "id_sesion": 1,
  "id_usuario": 1,
  "accion": "TEST_LOG",
  "metadata": {
    "source": "postman"
  }
}
```

Devuelve `data.id_log`.

#### `PUT /api/auth/logs/:id_log`

Body:

```json
{
  "accion": "TEST_LOG_UPDATED"
}
```

#### `GET /api/auth/logs/:id_log`

Obtiene log.

#### `GET /api/auth/logs`

Lista logs.

---

### Tipos de apoyo

Base path:

```txt
/api/apoyos/tipos
```

#### `POST /api/apoyos/tipos`

Body:

```json
{
  "codigo": "FLAN_TEST",
  "nombre": "Flan Test",
  "descripcion": "Tipo de apoyo de prueba",
  "monto_unitario_bs": "10.00"
}
```

Devuelve `data.id_tipo_apoyo`.

#### `PUT /api/apoyos/tipos/:id_tipo_apoyo`

Body:

```json
{
  "nombre": "Flan Test Actualizado"
}
```

#### `GET /api/apoyos/tipos/:id_tipo_apoyo`

Obtiene tipo de apoyo.

#### `GET /api/apoyos/tipos`

Lista tipos de apoyo.

---

### Metas de apoyo

Base path:

```txt
/api/apoyos/metas
```

#### `POST /api/apoyos/metas`

Body:

```json
{
  "id_creador": 1,
  "titulo": "Meta de prueba",
  "descripcion": "Descripción de la meta"
}
```

Devuelve `data.id_meta`.

#### `PUT /api/apoyos/metas/:id_meta`

Body:

```json
{
  "titulo": "Meta actualizada"
}
```

#### `GET /api/apoyos/metas/:id_meta`

Obtiene meta.

#### `GET /api/apoyos/metas`

Lista metas.

---

### Apoyos

Base path:

```txt
/api/apoyos
```

#### `POST /api/apoyos`

Body:

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

Devuelve `data.id_apoyo` y la DB calcula `monto_total_bs`.

#### `PUT /api/apoyos/:id_apoyo`

Body:

```json
{
  "mensaje": "Mensaje actualizado"
}
```

#### `GET /api/apoyos/:id_apoyo`

Obtiene apoyo.

#### `GET /api/apoyos`

Lista apoyos.

---

### Publicaciones

Base path:

```txt
/api/publicaciones
```

#### `POST /api/publicaciones`

Crea una publicación solo-texto.

Body:

```json
{
  "id_creador": 1,
  "texto": "Primera publicación de prueba"
}
```

Devuelve `data.id_publicacion`.

#### `POST /api/publicaciones/con-imagenes`

Crea una publicación y sus imágenes en una transacción.

Body:

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

Respuesta esperada:

```json
{
  "success": true,
  "message": "Publicación creada con imágenes correctamente.",
  "data": {
    "id_publicacion": 1,
    "id_creador": 1,
    "texto": "Publicación con imágenes",
    "imagenes": []
  }
}
```

#### `PUT /api/publicaciones/:id_publicacion`

Body:

```json
{
  "texto": "Texto actualizado"
}
```

#### `GET /api/publicaciones/:id_publicacion`

Obtiene publicación.

#### `GET /api/publicaciones`

Lista publicaciones.

---

### Imágenes de publicación

Base path:

```txt
/api/publicaciones/imagenes
```

#### `POST /api/publicaciones/imagenes`

Body:

```json
{
  "id_publicacion": 1,
  "link_imagen": "https://example.com/extra.jpg",
  "orden": 3
}
```

Devuelve `data.id_publicacion_imagen`.

#### `PUT /api/publicaciones/imagenes/:id_publicacion_imagen`

Body:

```json
{
  "orden": 4
}
```

#### `GET /api/publicaciones/imagenes/:id_publicacion_imagen`

Obtiene imagen.

#### `GET /api/publicaciones/imagenes`

Lista imágenes.

---

### Comentarios de publicación

Base path:

```txt
/api/publicaciones/comentarios
```

#### `POST /api/publicaciones/comentarios`

Body:

```json
{
  "id_publicacion": 1,
  "id_seguidor": 2,
  "comentario": "Buen contenido"
}
```

Devuelve `data.id_comentario`.

#### `PUT /api/publicaciones/comentarios/:id_comentario`

Body:

```json
{
  "comentario": "Comentario actualizado"
}
```

#### `GET /api/publicaciones/comentarios/:id_comentario`

Obtiene comentario.

#### `GET /api/publicaciones/comentarios`

Lista comentarios.

---

## 9. Cómo correr localmente

Instalar dependencias:

```bash
npm install
```

Crear `.env`:

```bash
cp .env.example .env
```

Ajustar conexión PostgreSQL/Neon en `.env`.

Levantar servidor:

```bash
npm run dev
```

Probar health:

```http
GET http://localhost:3000/health
```

---

## 10. Revisión realizada antes del testing

Se corrigió lo siguiente:

1. Los services ya no repiten validaciones que corresponden al middleware Zod.
2. `createCrudService` queda como service global de coordinación CRUD y manejo de errores, no como validador de request.
3. Se corrigió `getUserId.js`, que tenía un `return 18` hardcodeado.
4. JWT y `jwtMiddleware` fueron alineados a `id_usuario`, no a `id_persona` de proyectos anteriores.
5. `POST /api/publicaciones` ahora exige `texto`, para evitar publicaciones vacías.
6. `POST /api/publicaciones/con-imagenes` mantiene validación Zod y crea publicación + imágenes en transacción.
7. `package.json` ahora incluye scripts y dependencias necesarias.
8. `.env.example` fue alineado a las variables reales usadas por `db.config.js`.
9. Se agregó colección Postman para probar el flujo completo y todos los endpoints.

