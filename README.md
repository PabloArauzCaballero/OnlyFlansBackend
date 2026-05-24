# OnlyFlans Backend

Backend REST para una plataforma de creadores, seguidores, publicaciones, apoyos y autenticación. Está construido con **Node.js**, **Express**, **Sequelize**, **PostgreSQL/Neon**, **Zod**, **Pino**, **JWT**, **cookies HTTP-only**, **Redis opcional** y **Yarn** como gestor de dependencias.

Este README está ajustado al estado real del código del proyecto. La documentación anterior mezclaba rutas internas con rutas HTTP públicas. En esta versión queda claro qué endpoints existen, qué carpetas participan en cada flujo, qué recibe cada capa y por qué está organizada así.

---

## 1. Requisitos para levantar el backend

Necesitas tener instalado:

| Herramienta | Uso |
|---|---|
| Node.js | Ejecutar el servidor Express. |
| Yarn | Instalar dependencias y ejecutar scripts. Este proyecto usa `yarn.lock`. |
| PostgreSQL o Neon | Base de datos principal. |
| Redis | Opcional. Solo se conecta si `REDIS_ENABLED=true`. |
| Postman/Bruno | Opcional, para probar endpoints. Hay una colección Postman en `docs/TEST`. |

> Importante: no uses `npm install` en este proyecto si vas a mantener Yarn como estándar. Mezclar `package-lock.json` con `yarn.lock` suele generar instalaciones inconsistentes, especialmente en deploys.

---

## 2. Instalación con Yarn

Desde la raíz del backend:

```bash
yarn install --frozen-lockfile
```

Si estás en desarrollo local y todavía no existe el archivo `.env`:

```bash
cp .env.example .env
```

En Windows PowerShell puedes usar:

```powershell
Copy-Item .env.example .env
```

Luego ajusta las variables de conexión a PostgreSQL/Neon, JWT, cookies, CORS y Redis.

Levantar en desarrollo:

```bash
yarn dev
```

Levantar en modo normal:

```bash
yarn start
```

Revisar sintaxis del entrypoint:

```bash
yarn check
```

Probar que el servidor responde:

```http
GET http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "ok": true,
  "message": "Servidor funcionando correctamente"
}
```

---

## 3. Scripts disponibles

Los scripts se encuentran en `package.json`.

| Script | Comando | Qué hace |
|---|---|---|
| `start` | `yarn start` | Ejecuta `node server.js`. Se usa para producción o ejecución directa. |
| `dev` | `yarn dev` | Ejecuta `nodemon server.js`. Reinicia el servidor al detectar cambios. |
| `check` | `yarn check` | Ejecuta `node --check server.js` para validar sintaxis básica del entrypoint. |

---

## 4. Variables de entorno principales

La plantilla está en `.env.example`. El archivo real `.env` no debe subirse al repositorio.

| Variable | Uso |
|---|---|
| `NODE_ENV` | Define entorno: `development`, `production`, etc. |
| `PORT` | Puerto donde escucha Express. Por defecto `3000`. |
| `LOG_LEVEL` | Nivel de logs de Pino: `info`, `debug`, `warn`, `error`, etc. |
| `LOG_FILE` | Destino del log. Por defecto `./logs/app.log`. |
| `CORS_ORIGINS` | Orígenes permitidos separados por coma. Ejemplo: `http://localhost:5173,http://localhost:3000`. |
| `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` | Conexión PostgreSQL/Neon. |
| `PGSSLMODE` | En Neon normalmente `require`. Localmente puede ser `disable`. |
| `PGCHANNELBINDING` | En Neon puede ser `require`; localmente puede ser `disable`. |
| `DB_LOGGING` | Si es `true`, registra consultas SQL de Sequelize. |
| `JWT_ACCESS_SECRET` | Secreto para JWT de acceso. Debe ser largo y privado. |
| `JWT_REFRESH_SECRET` | Secreto para JWT de refresh. Debe ser diferente al access secret. |
| `SESSION_TOKEN` | Secreto para tokens de sesión si se usan. |
| `JWT_ACCESS_EXPIRES_IN` | Duración del access token. Ejemplo: `15m`. |
| `JWT_REFRESH_EXPIRES_IN` | Duración del refresh token. Ejemplo: `7d`. |
| `COOKIE_NAME` | Nombre de la cookie de access token. Por defecto `access_token`. |
| `REFRESH_COOKIE_NAME` | Nombre de la cookie refresh. Por defecto `refresh_token`. |
| `COOKIE_MAX_AGE_MS` | Duración de cookie access en milisegundos. |
| `REFRESH_COOKIE_MAX_AGE_MS` | Duración de cookie refresh en milisegundos. |
| `COOKIE_SECURE` | Si es `true`, cookies solo sobre HTTPS. En producción debe ser `true`. |
| `COOKIE_SAME_SITE` | Política SameSite. Por defecto `lax`. |
| `REDIS_ENABLED` | Si es `true`, intenta conectar Redis al arrancar. |
| `REDIS_URL` | URL de conexión Redis. |

---

## 5. Flujo general de arranque

```txt
server.js
  ↓
carga variables de entorno con dotenv
  ↓
importa app.js
  ↓
connectDatabase() desde core/db/db.config.js
  ↓
connectRedis() desde core/redis/redis.config.js si REDIS_ENABLED=true
  ↓
app.listen(PORT)
  ↓
registra señales SIGTERM y SIGINT para cerrar recursos
```

`server.js` no define rutas. Su responsabilidad es levantar la aplicación, conectar infraestructura y apagar correctamente.

---

## 6. Flujo general de una petición HTTP

```txt
Cliente / Frontend / Postman
  ↓
app.js
  ↓
pino-http: crea logger por request y request id
  ↓
helmet: headers básicos de seguridad
  ↓
compression: comprime respuestas grandes
  ↓
cors: valida origen permitido
  ↓
rateLimit: limita abuso global, excepto /api/auth
  ↓
cookieParser: lee cookies HTTP
  ↓
express.json / express.urlencoded: parsea body
  ↓
/health si aplica
  ↓
REQUEST HIT log
  ↓
actionLog.middleware: prepara y persiste logs al finalizar response
  ↓
src/modules/index.js
  ↓
módulo correspondiente: auth, usuarios, apoyos o publicaciones
  ↓
router/*.router.js
  ↓
validateBody / validateParams / validateQuery con Zod
  ↓
controller/*.controller.js
  ↓
service/*.service.js
  ↓
repository/*.repository.js
  ↓
model/*.model.js Sequelize
  ↓
PostgreSQL / Neon
```

La validación del request se hace antes del controller. Por eso el service no debe repetir validaciones de forma como email inválido, ID positivo, campo requerido o body vacío en update. El service se reserva para coordinación, reglas de negocio y transacciones.

---

## 7. Arquitectura por capas

| Capa | Carpeta/archivo | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| Entry point | `server.js` | Variables de entorno y aplicación Express | Servidor HTTP escuchando | Separar arranque de configuración HTTP. |
| App Express | `app.js` | Request HTTP | Routing, 404 o error global | Centralizar middlewares globales. |
| Module loader | `src/modules/index.js` | Configuración de módulos | Lista de módulos montables | Evitar montar rutas manualmente una por una en `app.js`. |
| Module index | `src/modules/*/index.js` | Routers internos | `{ moduleName, basePath, router }` | Declarar base path y subrutas del módulo. |
| Router | `router/*.router.js` | Request sin validar | Request validado hacia controller | Definir endpoint, método HTTP y validadores. |
| Schema | `schema/*.schema.js` | `body`, `params`, `query` | Datos parseados y normalizados | Validar entrada con Zod antes de tocar negocio o DB. |
| Controller | `controller/*.controller.js` | `req`, `res` ya validados | JSON HTTP | Traducir HTTP ↔ service y registrar logs. |
| Service | `service/*.service.js` | Payload limpio o params limpios | Resultado de negocio `{ success, data, message }` | Coordinar casos de uso, errores, hooks y transacciones. |
| Repository | `repository/*.repository.js` | Datos listos para DB | Registros Sequelize convertidos a objeto plano | Aislar acceso a datos. |
| Model | `model/*.model.js` | Instancia Sequelize | Modelo ORM | Representar tablas del esquema `onlyflans`. |
| Shared | `src/shared/*` | Funciones reutilizables | Helpers genéricos | Evitar duplicación entre módulos. |
| Core | `core/*` | Configuración base | DB, JWT, Redis, hash | Centralizar infraestructura técnica. |

---

## 8. Rutas públicas reales del backend

### 8.1 Health

| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| `GET` | `/health` | No | Verifica que Express está funcionando. |

---

### 8.2 Auth

Base path: `/api/auth`

| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| `POST` | `/api/auth/registro/creador` | No | Crea usuario con rol `CREADOR` y su `perfil_creador` en una transacción. |
| `POST` | `/api/auth/registro/seguidor` | No | Crea usuario con rol `SEGUIDOR` y su `perfil_seguidor` en una transacción. |
| `POST` | `/api/auth/login` | No | Valida credenciales, crea sesión, registra log, genera JWT y setea cookies HTTP-only. |
| `POST` | `/api/auth/logout` | Sí | Cierra la sesión activa y limpia cookies. |
| `GET` | `/api/auth/me` | Sí | Devuelve el usuario autenticado y su perfil asociado si existe. |

> Sesiones y logs existen como services, repositories y models internos. Actualmente no tienen router público montado en `src/modules/auth/index.js`. Por eso no se deben documentar como `/api/auth/sesiones` o `/api/auth/logs` mientras no se agreguen rutas.

---

### 8.3 Usuarios

Base path: `/api/usuarios`

| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| `GET` | `/api/usuarios` | No | Lista usuarios con paginación y filtros. |
| `GET` | `/api/usuarios/:id_usuario` | No | Obtiene un usuario por ID. |
| `PUT` | `/api/usuarios/:id_usuario` | No | Actualiza un usuario existente. |
| `GET` | `/api/usuarios/perfiles-creadores` | No | Lista perfiles de creadores. |
| `GET` | `/api/usuarios/perfiles-creadores/:id_usuario` | No | Obtiene perfil de creador por `id_usuario`. |
| `PUT` | `/api/usuarios/perfiles-creadores/:id_usuario` | No | Actualiza perfil de creador. |
| `GET` | `/api/usuarios/perfiles-seguidores` | No | Lista perfiles de seguidores. |
| `GET` | `/api/usuarios/perfiles-seguidores/:id_usuario` | No | Obtiene perfil de seguidor por `id_usuario`. |
| `PUT` | `/api/usuarios/perfiles-seguidores/:id_usuario` | No | Actualiza perfil de seguidor. |
| `POST` | `/api/usuarios/creadores-favoritos` | No | Marca un creador como favorito para un seguidor. |
| `PUT` | `/api/usuarios/creadores-favoritos/:id_favorito` | No | Actualiza un favorito. |
| `GET` | `/api/usuarios/creadores-favoritos/:id_favorito` | No | Obtiene un favorito. |
| `GET` | `/api/usuarios/creadores-favoritos` | No | Lista favoritos. |
| `POST` | `/api/usuarios/creadores-seguidos` | No | Registra seguimiento de un seguidor a un creador. |
| `PUT` | `/api/usuarios/creadores-seguidos/:id_seguimiento` | No | Actualiza un seguimiento. |
| `GET` | `/api/usuarios/creadores-seguidos/:id_seguimiento` | No | Obtiene un seguimiento. |
| `GET` | `/api/usuarios/creadores-seguidos` | No | Lista seguimientos. |

> No existe `POST /api/usuarios` en el router actual. Para crear usuarios se debe usar `/api/auth/registro/creador` o `/api/auth/registro/seguidor`, porque el diseño exige crear usuario junto con su perfil correspondiente.

---

### 8.4 Apoyos

Base path: `/api/apoyos`

| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| `POST` | `/api/apoyos/tipos` | No | Crea un tipo de apoyo. |
| `PUT` | `/api/apoyos/tipos/:id_tipo_apoyo` | No | Actualiza un tipo de apoyo. |
| `GET` | `/api/apoyos/tipos/:id_tipo_apoyo` | No | Obtiene un tipo de apoyo. |
| `GET` | `/api/apoyos/tipos` | No | Lista tipos de apoyo. |
| `POST` | `/api/apoyos/metas` | No | Crea una meta de apoyo para un creador. |
| `PUT` | `/api/apoyos/metas/:id_meta` | No | Actualiza una meta. |
| `GET` | `/api/apoyos/metas/:id_meta` | No | Obtiene una meta. |
| `GET` | `/api/apoyos/metas` | No | Lista metas. |
| `POST` | `/api/apoyos` | No | Crea un apoyo realizado por un seguidor a un creador. |
| `PUT` | `/api/apoyos/:id_apoyo` | No | Actualiza un apoyo. |
| `GET` | `/api/apoyos/:id_apoyo` | No | Obtiene un apoyo. |
| `GET` | `/api/apoyos` | No | Lista apoyos. |

---

### 8.5 Publicaciones

Base path: `/api/publicaciones`

| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| `POST` | `/api/publicaciones` | No | Crea una publicación solo texto. |
| `POST` | `/api/publicaciones/con-imagenes` | No | Crea publicación e imágenes en una transacción. |
| `PUT` | `/api/publicaciones/:id_publicacion` | No | Actualiza una publicación. |
| `GET` | `/api/publicaciones/:id_publicacion` | No | Obtiene una publicación. |
| `GET` | `/api/publicaciones` | No | Lista publicaciones. |
| `POST` | `/api/publicaciones/imagenes` | No | Crea una imagen asociada a una publicación existente. |
| `PUT` | `/api/publicaciones/imagenes/:id_publicacion_imagen` | No | Actualiza una imagen. |
| `GET` | `/api/publicaciones/imagenes/:id_publicacion_imagen` | No | Obtiene una imagen. |
| `GET` | `/api/publicaciones/imagenes` | No | Lista imágenes. |
| `POST` | `/api/publicaciones/comentarios` | No | Crea un comentario. |
| `PUT` | `/api/publicaciones/comentarios/:id_comentario` | No | Actualiza un comentario. |
| `GET` | `/api/publicaciones/comentarios/:id_comentario` | No | Obtiene un comentario. |
| `GET` | `/api/publicaciones/comentarios` | No | Lista comentarios. |

---

## 9. Flujo de autenticación

### 9.1 Registro de creador

```http
POST /api/auth/registro/creador
```

Body esperado:

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

Qué ocurre internamente:

1. `auth.router.js` valida el body con `registrarCreadorSchema`.
2. `auth.controller.js` oculta la contraseña en logs.
3. `auth.service.js` hashea la contraseña y fuerza `rol: "CREADOR"`.
4. `auth.repository.js` abre una transacción.
5. Se crea `usuario`.
6. Se crea `perfil_creador` usando el `id_usuario` recién creado.
7. Se registra acción `REGISTRO_CREADOR` en `logs`.
8. Se devuelve el usuario sin `password_hash`.

---

### 9.2 Registro de seguidor

```http
POST /api/auth/registro/seguidor
```

Body esperado:

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

La lógica es equivalente al registro de creador, pero fuerza `rol: "SEGUIDOR"` y crea `perfil_seguidor`.

---

### 9.3 Login

```http
POST /api/auth/login
```

Body esperado:

```json
{
  "email": "creador@test.com",
  "password": "Password123"
}
```

Qué ocurre:

1. Se valida email y password con Zod.
2. Se busca usuario activo por email.
3. Se compara la contraseña contra `password_hash`.
4. Se crea una fila en `sesion_usuario`.
5. Se actualiza `ultimo_login`.
6. Se generan `accessToken` y `refreshToken`.
7. Se guardan cookies HTTP-only.
8. Se registra acción `LOGIN`.

Respuesta exitosa simplificada:

```json
{
  "success": true,
  "message": "Inicio de sesión correcto.",
  "data": {
    "user": {
      "id_usuario": 1,
      "nombre": "Creador Demo",
      "email": "creador@test.com",
      "rol": "CREADOR"
    },
    "session": {
      "id_sesion": 1,
      "fecha_inicio": "2026-05-24T00:00:00.000Z"
    },
    "accessToken": "jwt...",
    "refreshToken": "jwt..."
  }
}
```

Aunque el backend devuelve tokens en `data`, también los coloca en cookies HTTP-only. Para un frontend web, lo más seguro es usar cookies con `credentials: 'include'`.

---

### 9.4 Logout

```http
POST /api/auth/logout
```

Requiere autenticación mediante cookie `access_token` o header:

```http
Authorization: Bearer <accessToken>
```

Qué ocurre:

1. `requireAuth` verifica el JWT.
2. Valida que exista una sesión activa en `sesion_usuario`.
3. `AuthService.logout` cierra la sesión.
4. Se registra acción `LOGOUT`.
5. Se limpian cookies.

---

### 9.5 Usuario autenticado

```http
GET /api/auth/me
```

Requiere autenticación. Devuelve usuario activo con `perfilCreador` o `perfilSeguidor` si corresponde.

---

## 10. Validación con Zod

Los schemas viven en:

```txt
src/modules/*/schema/*.schema.js
src/shared/validation/common.schema.js
src/shared/validation/flows.schema.js
```

Los routers usan:

```js
validateBody(schema, logger, eventName)
validateParams(schema, logger, eventName)
validateQuery(schema, logger, eventName)
```

Cuando la validación falla, la respuesta es:

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

Para params inválidos se devuelve `Parámetros inválidos.` y para query inválida se devuelve `Query inválida.`.

---

## 11. Convención de respuestas

### Creación exitosa

```json
{
  "success": true,
  "message": "Registro creado correctamente.",
  "data": {}
}
```

### Actualización exitosa

```json
{
  "success": true,
  "message": "Registro actualizado correctamente.",
  "data": {}
}
```

### Obtención exitosa

```json
{
  "success": true,
  "message": "Registro obtenido correctamente.",
  "data": {}
}
```

### Listado exitoso

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

### Registro no encontrado

```json
{
  "success": false,
  "statusCode": 404,
  "message": "No se encontró el registro de usuario."
}
```

### Error por constraint de base de datos

```json
{
  "success": false,
  "statusCode": 409,
  "message": "Ya existe un registro con valores únicos repetidos."
}
```

---

## 12. Query estándar de listados

Los endpoints `GET /recurso` aceptan, según schema:

| Query param | Qué hace |
|---|---|
| `limit` | Cantidad máxima de registros. Máximo `100`. Por defecto `20`. |
| `offset` | Salto de registros para paginación. Por defecto `0`. |
| `search` | Búsqueda textual sobre campos `STRING`, `TEXT` o `CITEXT` del modelo. |
| `orderBy` | Campo por el que se ordena si existe en el modelo. |
| `orderDir` | `ASC` o `DESC`. Por defecto `DESC`. |
| `estado_registro` | Filtro por `ACTIVO`, `INACTIVO` o `ELIMINADO`. |

Cada schema puede agregar filtros propios, por ejemplo `id_creador`, `id_seguidor`, `rol`, `email`, etc.

---

## 13. Auditoría y logs

El backend tiene dos niveles de logging:

1. **Logs técnicos con Pino**: se escriben en `logs/app.log` o en el destino definido por `LOG_FILE`.
2. **Logs funcionales en base de datos**: `actionLog.middleware.js` registra acciones HTTP en la tabla `logs` al finalizar la respuesta.

El middleware sanitiza campos sensibles como:

```txt
password
password_hash
passwordHash
token
accessToken
refreshToken
authorization
```

`/health` se omite para no llenar logs con checks de disponibilidad.

---

## 14. Redis

Redis está configurado en `core/redis/redis.config.js` y es opcional.

- Si `REDIS_ENABLED=false`, el backend no intenta conectarse.
- Si `REDIS_ENABLED=true` pero falta `REDIS_URL`, se registra warning y no conecta.
- Si `REDIS_ENABLED=true` y `REDIS_URL` existe, intenta conectar al arrancar.

Los helpers de cache están en:

```txt
src/shared/cache/cacheKeys.js
src/shared/cache/redis.helper.js
```

---

## 15. Base de datos

La conexión está en `core/db/db.config.js`.

Los modelos Sequelize están distribuidos por módulo:

```txt
src/modules/auth/model
src/modules/usuarios/model
src/modules/apoyos/model
src/modules/publicaciones/model
```

Las asociaciones se centralizan en:

```txt
core/db/db.associations.js
```

Scripts SQL disponibles:

```txt
docs/DB/DDL.sql
docs/DB/patch.01.sql
```

---

## 16. Estructura principal del proyecto

```txt
OnlyFlansBackend/
├─ app.js
├─ server.js
├─ package.json
├─ yarn.lock
├─ .env.example
├─ core/
│  ├─ db/
│  ├─ jwt/
│  ├─ redis/
│  └─ sha2/
├─ docs/
│  ├─ DB/
│  ├─ ROUTES DOCS/
│  └─ TEST/
├─ logs/
├─ middlewares/
└─ src/
   ├─ modules/
   │  ├─ auth/
   │  ├─ usuarios/
   │  ├─ apoyos/
   │  └─ publicaciones/
   └─ shared/
      ├─ cache/
      ├─ http/
      ├─ repository/
      ├─ service/
      ├─ utils/
      └─ validation/
```

Cada carpeta relevante tiene su propio `README.md` para que un desarrollador pueda entrar por partes y entender qué hace cada sección.

---

## 17. Cómo agregar una nueva entidad CRUD

1. Crear modelo en `src/modules/<modulo>/model/<entidad>.model.js`.
2. Importar el modelo en `core/db/db.associations.js`.
3. Crear repository usando `createCrudRepository`.
4. Crear service usando `createCrudService`.
5. Crear schema Zod para `create`, `update`, `params` y `query`.
6. Crear controller con `create`, `update`, `get`, `list`.
7. Crear router y conectar validadores antes del controller.
8. Montar el router en `src/modules/<modulo>/index.js`.
9. Si es un módulo nuevo, agregarlo en `src/modules/index.js`.
10. Probar con Postman/Bruno y revisar logs.

---

## 18. Reglas importantes del backend

- No subir `node_modules` al repositorio.
- No subir `.env` al repositorio.
- Usar Yarn como gestor principal.
- Crear usuarios desde `auth`, no desde `usuarios`.
- No exponer sesiones/logs como endpoints públicos salvo que se decida explícitamente.
- Validar requests en router con Zod.
- No repetir validaciones de forma en service.
- Mantener reglas transaccionales en service/repository.
- Mantener acceso a base de datos dentro de repository.
- Mantener modelos alineados al DDL real.
- Usar cookies HTTP-only para auth web.
- Revisar `docs/ROUTES DOCS/ROUTES_ALL_MODULES.md` para una matriz completa de endpoints.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `raíz del proyecto`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `app.js`: configuración central de Express

Este archivo no define funciones de negocio, pero sí arma el pipeline global por el que pasa cada request.

| Bloque | Qué hace | Por qué existe |
|---|---|---|
| `app.disable("x-powered-by")` | Oculta la cabecera que delata que el servidor usa Express. | Reduce exposición innecesaria de información técnica. |
| `pinoHttp(...)` | Agrega logging HTTP y genera `req.id` con `x-request-id` o `Date.now()`. | Permite rastrear requests y correlacionar logs. |
| `helmet(...)` | Aplica cabeceras de seguridad HTTP. | Mejora seguridad por defecto sin tener que configurar cada ruta. |
| `compression(...)` | Comprime respuestas mayores a 1024 bytes, salvo header `x-no-compression`. | Reduce peso de respuestas y permite desactivar compresión en casos puntuales. |
| `cors(...)` | Valida origen contra `CORS_ORIGINS` y permite credenciales. | Controla qué frontends pueden consumir la API con cookies. |
| `rateLimit(...)` | Limita requests globales, saltando `/api/auth`. | Protege contra abuso básico sin bloquear el flujo de autenticación. |
| `cookieParser()` | Lee cookies y las deja en `req.cookies`. | Necesario para obtener `access_token` en `requireAuth`. |
| `express.json/urlencoded` | Parsea bodies JSON y formularios. | Permite que controllers lean `req.body`. |
| `GET /health` | Endpoint simple de estado del servidor. | Sirve para monitoreo, Render/health checks y pruebas rápidas. |
| `REQUEST HIT log` | Registra método y URL antes de entrar a rutas. | Ayuda a saber si una solicitud llegó al backend. |
| `actionLogMiddleware` | Registra auditoría después de cada respuesta. | Se coloca antes de los routers para auditar la mayoría de acciones. |
| Montaje de `src/modules` | Recorre módulos y hace `app.use(route, router)`. | Permite agregar módulos mediante configuración, sin tocar `app.js` cada vez. |
| Handler `404` | Responde cuando ninguna ruta coincidió. | Evita respuestas vacías o ambiguas ante rutas inexistentes. |
| Handler global de errores | Captura errores no manejados de Express. | Centraliza respuesta 500 y logging con stack trace. |


### `server.js`: arranque y apagado controlado

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `bootstrap()` | Carga variables `.env`, conecta PostgreSQL, conecta Redis si está habilitado y levanta Express en `PORT`. | No recibe parámetros directos; usa variables de entorno. | Inicia el servidor o termina el proceso con código `1` si falla. | Separa la configuración de la app (`app.js`) del ciclo de vida real del proceso. |
| `shutdown(signal)` | Cierra el servidor HTTP y luego la conexión de base de datos. | Señal del sistema (`SIGTERM` o `SIGINT`). | Finaliza el proceso con código `0`. | Evita cortar el proceso de golpe y deja conexiones limpias al apagar o redeployar. |

> Nota: `disconnectRedis` está importado, pero actualmente no se llama dentro de `shutdown`. Si se quiere cerrar Redis explícitamente, puede agregarse `await disconnectRedis()` antes de `process.exit(0)`.
<!-- FUNCTION_DOCS_END -->
