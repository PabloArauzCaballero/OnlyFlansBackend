# `auth/repository/`

Contiene acceso a datos específico de autenticación, sesiones y logs.

## Archivos

| Archivo | Qué hace |
|---|---|
| `auth.repository.js` | Consultas y transacciones especiales de auth. |
| `sesion_usuario.repository.js` | Repository CRUD de sesiones + cierre de sesión. |
| `logs.repository.js` | Repository CRUD de logs. |

## `auth.repository.js`

Funciones principales:

| Función | Qué hace |
|---|---|
| `findActiveUserByEmail(email)` | Busca usuario activo por email. Incluye `password_hash` porque se necesita para login. |
| `findActiveUserById(idUsuario)` | Busca usuario activo por ID e incluye perfiles. Elimina `password_hash`. |
| `updateLastLogin(idUsuario)` | Actualiza `ultimo_login` y `fecha_actualizacion`. |
| `createCreatorAccount({ usuario, perfil_creador })` | Crea usuario + perfil creador en una transacción. |
| `createFollowerAccount({ usuario, perfil_seguidor })` | Crea usuario + perfil seguidor en una transacción. |

## Transacciones

El registro usa `sequelize.transaction` para garantizar que no exista usuario sin perfil o perfil sin usuario. Si falla la creación del perfil, se revierte también el usuario.

## `sesion_usuario.repository.js`

Además del CRUD genérico, tiene:

```js
closeSession({ id_sesion, id_usuario })
```

Marca la sesión como cerrada:

```txt
fecha_cierre = now()
fecha_actualizacion = now()
estado_registro = INACTIVO
```
