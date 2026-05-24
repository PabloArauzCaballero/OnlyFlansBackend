# Módulo `usuarios`

Base path: `/api/usuarios`

Este módulo administra la consulta y actualización de usuarios, perfiles y relaciones entre seguidores y creadores. La creación inicial de usuarios no se hace aquí: se hace desde `auth`, porque el diseño exige crear usuario junto con `perfil_creador` o `perfil_seguidor`.

## Rutas expuestas

### Usuario

| Método | Ruta | Qué hace |
|---|---|---|
| `GET` | `/api/usuarios` | Lista usuarios. |
| `GET` | `/api/usuarios/:id_usuario` | Obtiene un usuario. |
| `PUT` | `/api/usuarios/:id_usuario` | Actualiza un usuario. |

### Perfil creador

| Método | Ruta | Qué hace |
|---|---|---|
| `GET` | `/api/usuarios/perfiles-creadores` | Lista perfiles de creadores. |
| `GET` | `/api/usuarios/perfiles-creadores/:id_usuario` | Obtiene perfil creador. |
| `PUT` | `/api/usuarios/perfiles-creadores/:id_usuario` | Actualiza perfil creador. |

### Perfil seguidor

| Método | Ruta | Qué hace |
|---|---|---|
| `GET` | `/api/usuarios/perfiles-seguidores` | Lista perfiles de seguidores. |
| `GET` | `/api/usuarios/perfiles-seguidores/:id_usuario` | Obtiene perfil seguidor. |
| `PUT` | `/api/usuarios/perfiles-seguidores/:id_usuario` | Actualiza perfil seguidor. |

### Favoritos y seguimientos

| Método | Ruta | Qué hace |
|---|---|---|
| `POST` | `/api/usuarios/creadores-favoritos` | Marca creador como favorito. |
| `PUT` | `/api/usuarios/creadores-favoritos/:id_favorito` | Actualiza favorito. |
| `GET` | `/api/usuarios/creadores-favoritos/:id_favorito` | Obtiene favorito. |
| `GET` | `/api/usuarios/creadores-favoritos` | Lista favoritos. |
| `POST` | `/api/usuarios/creadores-seguidos` | Sigue a un creador. |
| `PUT` | `/api/usuarios/creadores-seguidos/:id_seguimiento` | Actualiza seguimiento. |
| `GET` | `/api/usuarios/creadores-seguidos/:id_seguimiento` | Obtiene seguimiento. |
| `GET` | `/api/usuarios/creadores-seguidos` | Lista seguimientos. |

## Nota clave

No existe `POST /api/usuarios` en el router actual. El archivo `usuario.controller.js` sí tiene una función `create`, pero `usuario.router.js` no la monta. Eso es coherente con la regla de negocio: no crear usuarios sueltos sin perfil.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `index.js`

Este archivo no define funciones; exporta la configuración que `app.js` usa para montar el módulo.

| Export | Qué hace | Por qué existe |
|---|---|---|
| `moduleName` | Nombre lógico del módulo. | Permite construir rutas y logs consistentes. |
| `basePath` | Ruta base bajo `/api/...`. | Evita hardcodear rutas en `app.js`. |
| `router` | Router Express agregado del módulo. | Centraliza endpoints del módulo. |
<!-- FUNCTION_DOCS_END -->
