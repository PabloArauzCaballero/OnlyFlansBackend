# Carpeta `src/shared/repository/`

Contiene la factory genérica `createCrudRepository.js`.

## Qué resuelve

Evita repetir la misma lógica de Sequelize en cada entidad.

## Archivo

| Archivo | Qué hace |
|---|---|
| `createCrudRepository.js` | Crea repositories estándar con `create`, `get`, `list` y `update`. |

## Contrato de entrada

```js
createCrudRepository({
  Model,
  entity: "usuario",
  primaryKeys: ["id_usuario"],
});
```

| Parámetro | Qué significa |
|---|---|
| `Model` | Modelo Sequelize ya inicializado. |
| `entity` | Nombre lógico de la entidad. |
| `primaryKeys` | Lista de claves primarias. Soporta una o varias. |

## Métodos generados

| Método | Recibe | Hace | Devuelve |
|---|---|---|---|
| `create(payload)` | Objeto listo para DB. | Ejecuta `Model.create`. | Registro plano. |
| `get(idOrParams)` | ID simple o params con PK. | Busca por PK. | Registro plano o `null`. |
| `list(query)` | Query validada. | Aplica filtros, search, orden, limit y offset. | `{ count, rows, limit, offset }`. |
| `update(idOrParams, payload)` | ID/params y payload. | Ejecuta `Model.update` con `returning`. | Registro actualizado o `null`. |

## Filtros de listado

Ignora campos de control:

```txt
page, limit, offset, search, orderBy, orderDir
```

Los demás query params solo se usan si existen como atributos del modelo. Esto evita que un query param inventado rompa la consulta.

## Search

`search` busca con `iLike` sobre campos `STRING`, `TEXT` y `CITEXT`.
