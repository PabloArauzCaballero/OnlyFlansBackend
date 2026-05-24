# `usuarios/model/`

Modelos Sequelize del dominio de usuarios.

## Archivos

| Archivo | Tabla | Descripción |
|---|---|---|
| `usuario.model.js` | `onlyflans.usuario` | Usuario base con email, password hash, rol e imágenes. |
| `perfil_creador.model.js` | `onlyflans.perfil_creador` | Información pública del usuario creador. |
| `perfil_seguidor.model.js` | `onlyflans.perfil_seguidor` | Información pública del usuario seguidor. |
| `creador_favorito.model.js` | `onlyflans.creador_favorito` | Relación de favoritos entre seguidor y creador. |
| `creador_seguido.model.js` | `onlyflans.creador_seguido` | Relación de seguimiento entre seguidor y creador. |

## Auditoría común

La mayoría de modelos tienen:

```txt
fecha_registro
fecha_actualizacion
version
estado_registro
```

Los modelos están configurados con:

```js
timestamps: false
schema: "onlyflans"
freezeTableName: true
```

Esto significa que Sequelize no maneja automáticamente `createdAt`/`updatedAt`; se trabaja con las columnas reales del DDL.
