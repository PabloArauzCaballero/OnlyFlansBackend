# `publicaciones/model/`

Modelos Sequelize de publicaciones.

## Archivos

| Archivo | Tabla | Descripción |
|---|---|---|
| `publicacion.model.js` | `onlyflans.publicacion` | Publicación creada por un creador. |
| `publicacion_imagen.model.js` | `onlyflans.publicacion_imagen` | Imagen asociada a una publicación. |
| `comentario_publicacion.model.js` | `onlyflans.comentario_publicacion` | Comentario hecho por un seguidor. |

## Relaciones clave

```txt
publicacion.id_creador → perfil_creador.id_usuario
publicacion_imagen.id_publicacion → publicacion.id_publicacion
comentario_publicacion.id_publicacion → publicacion.id_publicacion
comentario_publicacion.id_seguidor → perfil_seguidor.id_usuario
```

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/publicaciones/model`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `comentario_publicacion.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `ComentarioPublicacion`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `ComentarioPublicacion` sobre `onlyflans.comentario_publicacion`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_comentario | DataTypes.BIGINT | false | sí | sí | no |
| id_publicacion | DataTypes.BIGINT | false | no | no | sí |
| id_seguidor | DataTypes.BIGINT | false | no | no | sí |
| comentario | DataTypes.TEXT | false | no | no | no |
| fecha_comentario | DataTypes.DATE | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `publicacion.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `Publicacion`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `Publicacion` sobre `onlyflans.publicacion`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_publicacion | DataTypes.BIGINT | false | sí | sí | no |
| id_creador | DataTypes.BIGINT | false | no | no | sí |
| texto | DataTypes.TEXT | true | no | no | no |
| fecha_publicacion | DataTypes.DATE | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `publicacion_imagen.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `PublicacionImagen`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `PublicacionImagen` sobre `onlyflans.publicacion_imagen`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_publicacion_imagen | DataTypes.BIGINT | false | sí | sí | no |
| id_publicacion | DataTypes.BIGINT | false | no | no | sí |
| link_imagen | DataTypes.TEXT | false | no | no | no |
| orden | DataTypes.INTEGER | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |
<!-- FUNCTION_DOCS_END -->
