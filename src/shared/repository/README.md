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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared/repository`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `createCrudRepository.js`: factory de repositories CRUD con Sequelize

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `toPlain(value)` | Convierte instancia Sequelize a objeto plano. | Instancia/objeto. | Objeto plano. | Repositories devuelven datos listos para service/controller. |
| `getSingleId(idOrParams, primaryKey)` | Extrae id cuando hay PK simple. | Id directo u objeto params. | Valor de PK. | Permite llamar `get(1)` o `get({ id_usuario: 1 })`. |
| `buildWhereFromId(idOrParams, primaryKeys)` | Construye objeto `where` para PK simple o compuesta. | Id/params y arreglo de PK. | Objeto `where`. | Unifica soporte de tablas normales y tablas puente. |
| `hasMissingPrimaryKey(where)` | Detecta llaves primarias faltantes o vacías. | Objeto `where`. | Boolean. | Evita consultar/actualizar con identificadores incompletos. |
| `normalizeBooleanValue(value)` | Convierte `"true"`, `"1"`, `1`, `"false"`, `"0"`, `0` a boolean. | Valor de filtro. | Boolean o valor original. | Los query params llegan como texto; esto ajusta filtros booleanos. |
| `normalizeWhereValue(attribute, value)` | Normaliza valor según tipo de atributo Sequelize. | Atributo y valor. | Valor normalizado. | Evita que filtros booleanos fallen por tipo. |
| `buildSearchWhere(Model, search)` | Busca campos string/text/citext y arma condición `ILIKE`. | Modelo y texto `search`. | Condición Sequelize o `null`. | Agrega búsqueda genérica sin escribirla por entidad. |
| `buildWhereFromQuery(Model, query)` | Convierte query params en filtros válidos del modelo e integra búsqueda. | Modelo y query. | Objeto `where`. | Ignora campos de control (`limit`, `offset`, etc.) y campos inexistentes para consultas seguras. |
| `getOrder(Model, primaryKeys, query)` | Determina columna y dirección de orden. | Modelo, PKs y query. | Array `order` de Sequelize. | Evita ordenar por columnas inexistentes y define default por PK. |
| `normalizePagination(query)` | Normaliza `limit` y `offset`, limitando máximo 100. | Query. | `{ limit, offset }`. | Protege contra listados enormes y da paginación estable. |
| `addUpdateTimestamps(Model, payload)` | Agrega `fecha_actualizacion` si el modelo tiene ese atributo y no fue enviado. | Modelo y payload. | Payload actualizado. | Mantiene auditoría de modificación desde repository. |
| `createCrudRepository({ Model, entity, primaryKeys })` | Valida configuración y crea métodos `create`, `get`, `list`, `update`. | Modelo Sequelize, nombre de entidad y PKs. | Repository con métodos CRUD. | Reduce boilerplate y asegura comportamiento uniforme por módulo. |
| `create(payload)` | Inserta un registro con `Model.create`. | Payload ya validado. | Registro plano. | Capa única para creación directa. |
| `get(idOrParams)` | Busca por PK simple o compuesta. | Id o params. | Registro plano o `null`. | Encapsula búsqueda por identificador. |
| `list(query)` | Ejecuta `findAndCountAll` con filtros, búsqueda, orden y paginación. | Query validado. | `{ count, rows, limit, offset }`. | Respuesta lista para tablas/paginación del frontend. |
| `update(idOrParams, payload)` | Actualiza por PK y devuelve la fila actualizada. | Id/params y payload. | Registro plano o `null`. | Permite al frontend recibir el estado final del registro. |
<!-- FUNCTION_DOCS_END -->
