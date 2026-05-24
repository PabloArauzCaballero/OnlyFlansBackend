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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/usuarios/model`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `creador_favorito.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `CreadorFavorito`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `CreadorFavorito` sobre `onlyflans.creador_favorito`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_favorito | DataTypes.BIGINT | false | sí | sí | no |
| id_seguidor | DataTypes.BIGINT | false | no | no | sí |
| id_creador | DataTypes.BIGINT | false | no | no | sí |
| fecha_favorito | DataTypes.DATE | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `creador_seguido.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `CreadorSeguido`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `CreadorSeguido` sobre `onlyflans.creador_seguido`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_seguimiento | DataTypes.BIGINT | false | sí | sí | no |
| id_seguidor | DataTypes.BIGINT | false | no | no | sí |
| id_creador | DataTypes.BIGINT | false | no | no | sí |
| fecha_seguimiento | DataTypes.DATE | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `perfil_creador.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `PerfilCreador`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `PerfilCreador` sobre `onlyflans.perfil_creador`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_usuario | DataTypes.BIGINT | false | sí | no | sí |
| nombre_publico | DataTypes.STRING(120) | false | no | no | no |
| biografia | DataTypes.TEXT | true | no | no | no |
| foto_perfil_url | DataTypes.TEXT | true | no | no | no |
| banner_url | DataTypes.TEXT | true | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `perfil_seguidor.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `PerfilSeguidor`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `PerfilSeguidor` sobre `onlyflans.perfil_seguidor`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_usuario | DataTypes.BIGINT | false | sí | no | sí |
| nombre_visible | DataTypes.STRING(120) | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `usuario.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `Usuario`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `Usuario` sobre `onlyflans.usuario`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_usuario | DataTypes.BIGINT | false | sí | sí | no |
| nombre | DataTypes.STRING(120) | false | no | no | no |
| email | DataTypes.CITEXT | false | no | no | no |
| password_hash | DataTypes.TEXT | false | no | no | no |
| rol | DataTypes.STRING(20) | false | no | no | no |
| ultimo_login | DataTypes.DATE | true | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |
| url_imagen_portada | DataTypes.TEXT | true | no | no | no |
| imagen_perfil | DataTypes.TEXT | true | no | no | no |
<!-- FUNCTION_DOCS_END -->
