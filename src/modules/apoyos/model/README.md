# `apoyos/model/`

Modelos Sequelize del módulo de apoyos.

## Archivos

| Archivo | Tabla | Descripción |
|---|---|---|
| `tipo_apoyo.model.js` | `onlyflans.tipo_apoyo` | Catálogo de tipos de apoyo. |
| `meta_apoyo.model.js` | `onlyflans.meta_apoyo` | Metas creadas por creadores. |
| `apoyo.model.js` | `onlyflans.apoyo` | Apoyos realizados por seguidores. |

## Campos clave

`apoyo` referencia:

```txt
id_seguidor → perfil_seguidor.id_usuario
id_creador → perfil_creador.id_usuario
id_tipo_apoyo → tipo_apoyo.id_tipo_apoyo
```

`monto_total_bs` existe en el modelo como lectura, pero no debe venir del request.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos/model`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `apoyo.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `Apoyo`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `Apoyo` sobre `onlyflans.apoyo`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_apoyo | DataTypes.BIGINT | false | sí | sí | no |
| id_seguidor | DataTypes.BIGINT | false | no | no | sí |
| id_creador | DataTypes.BIGINT | false | no | no | sí |
| id_tipo_apoyo | DataTypes.BIGINT | false | no | no | sí |
| cantidad | DataTypes.INTEGER | false | no | no | no |
| monto_unitario_bs | DataTypes.DECIMAL(10,2) | false | no | no | no |
| monto_total_bs | DataTypes.DECIMAL(12,2) | true | no | no | no |
| mensaje | DataTypes.TEXT | true | no | no | no |
| estado_pago | DataTypes.STRING(30) | false | no | no | no |
| fecha_apoyo | DataTypes.DATE | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `meta_apoyo.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `MetaApoyo`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `MetaApoyo` sobre `onlyflans.meta_apoyo`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_meta | DataTypes.BIGINT | false | sí | sí | no |
| id_creador | DataTypes.BIGINT | false | no | no | sí |
| titulo | DataTypes.STRING(160) | false | no | no | no |
| descripcion | DataTypes.TEXT | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |

### `tipo_apoyo.model.js`

Este archivo exporta una factory `(sequelize) => Model` para registrar el modelo `TipoApoyo`.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = (sequelize) => ...` | Define el modelo Sequelize `TipoApoyo` sobre `onlyflans.tipo_apoyo`. | Permite inicializar el modelo con la instancia única de Sequelize de `core/db/db.config.js`. |
| `timestamps: false` | Indica que Sequelize no maneja automáticamente `createdAt/updatedAt`. | El proyecto usa nombres propios como `fecha_registro` y `fecha_actualizacion`. |

Campos principales detectados:

| Campo | Tipo | Nullable | PK | Auto | FK |
|---|---|---|---|---|---|
| id_tipo_apoyo | DataTypes.BIGINT | false | sí | sí | no |
| codigo | DataTypes.STRING(40) | false | no | no | no |
| nombre | DataTypes.STRING(100) | false | no | no | no |
| descripcion | DataTypes.TEXT | true | no | no | no |
| monto_unitario_bs | DataTypes.DECIMAL(10,2) | false | no | no | no |
| fecha_registro | DataTypes.DATE | false | no | no | no |
| fecha_actualizacion | DataTypes.DATE | false | no | no | no |
| version | DataTypes.INTEGER | false | no | no | no |
| estado_registro | DataTypes.STRING(20) | false | no | no | no |
<!-- FUNCTION_DOCS_END -->
