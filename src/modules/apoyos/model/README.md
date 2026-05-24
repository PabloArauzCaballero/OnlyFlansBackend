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
