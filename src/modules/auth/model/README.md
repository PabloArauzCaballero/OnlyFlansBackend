# `auth/model/`

Contiene modelos Sequelize relacionados con sesión y logs.

## Archivos

| Archivo | Tabla | Primary key | Uso |
|---|---|---|---|
| `sesion_usuario.model.js` | `onlyflans.sesion_usuario` | `id_sesion` | Guarda sesiones abiertas/cerradas por usuario. |
| `logs.model.js` | `onlyflans.logs` | `id_log` | Guarda acciones funcionales y auditoría HTTP. |

## `sesion_usuario`

Campos principales:

```txt
id_sesion
id_usuario
fecha_inicio
fecha_cierre
ip
user_agent
fecha_registro
fecha_actualizacion
version
estado_registro
```

## `logs`

Campos principales:

```txt
id_log
id_sesion
id_usuario
accion
metadata
fecha_registro
fecha_actualizacion
version
estado_registro
```

## Relación con auth

- Login crea sesión.
- Logout cierra sesión.
- `requireAuth` revisa que la sesión siga activa.
- `actionLog.middleware.js` y `LogsService.recordAction` insertan logs.
