# Carpeta `src/shared/service/`

Contiene la factory genérica `createCrudService.js`.

## Qué resuelve

Centraliza comportamiento común de services CRUD:

- creación;
- actualización;
- obtención;
- listado;
- not found;
- errores de constraints;
- respuesta uniforme;
- hooks opcionales.

## Contrato de entrada

```js
createCrudService({
  Repository,
  entityName: "usuario",
  serviceName: "usuario.service",
  hooks: {}
});
```

| Parámetro | Qué significa |
|---|---|
| `Repository` | Objeto con métodos `create`, `update`, `get`, `list`. |
| `entityName` | Nombre usado para mensajes y eventos. |
| `serviceName` | Nombre usado por logger. |
| `hooks` | Funciones opcionales antes/después de operaciones. |

## Métodos generados

| Método | Recibe | Devuelve |
|---|---|---|
| `create(payload)` | Payload ya validado por Zod. | `{ success, message, data }`. |
| `update(idOrParams, payload)` | Params validados y body validado. | `{ success, message, data }` o 404. |
| `get(idOrParams)` | Params validados. | Registro o 404. |
| `list(query)` | Query validada. | Lista con paginación. |

## Campos protegidos

El service elimina campos que no deben llegar desde el cliente en create/update:

```txt
fecha_registro
fecha_actualizacion
version
version_registro
created_at
updated_at
deleted_at
monto_total_bs
```

Esto evita que el cliente manipule columnas de control o generadas.

## Regla importante

Este service no reemplaza Zod. El request ya debe llegar validado desde router. Aquí se coordinan operaciones y errores de negocio/base de datos.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared/service`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `createCrudService.js`: factory de services CRUD con errores controlados

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `toPlain(value)` | Convierte instancias u objetos a datos planos. | Instancia/objeto. | Objeto plano. | Asegura respuestas simples desde services. |
| `isPlainObject(value)` | Verifica que el valor sea objeto común y no array. | Cualquier valor. | Boolean. | Evita procesar payloads inválidos como si fueran objetos. |
| `cleanObject(value, options)` | Elimina `undefined` y, por defecto, campos protegidos del sistema. | Payload/query y opciones. | Objeto limpio. | Impide que el cliente sobrescriba campos como `fecha_registro`, `version` o calculados. |
| `normalizeIdOrParams(idOrParams)` | Limpia ids/params si son objeto; si son primitivos los deja igual. | Id directo u objeto. | Id normalizado. | Soporta PK simple y compuesta de forma uniforme. |
| `runHook(hook, args, fallbackData)` | Ejecuta hooks opcionales `before/after` y normaliza resultado. | Hook, argumentos y fallback. | `{ success, data }`. | Permite agregar reglas especiales sin romper el CRUD estándar. |
| `internalErrorResult(message)` | Crea respuesta estándar de error 500. | Mensaje. | Objeto `{ success:false, statusCode:500 }`. | Evita duplicar estructuras de error interno. |
| `notFoundResult(entityName)` | Crea respuesta estándar 404. | Nombre de entidad. | Objeto de no encontrado. | Hace coherente la respuesta cuando falta un registro. |
| `databaseErrorResult(error)` | Traduce errores Sequelize conocidos a 400/409. | Error de Sequelize. | Objeto de error controlado o `null`. | Convierte restricciones únicas, FK, check y not-null en respuestas entendibles. |
| `createCrudService({ Repository, entityName, serviceName, hooks })` | Crea service con `create`, `update`, `get`, `list`. | Repository, nombre de entidad, nombre de service y hooks. | Objeto service. | Centraliza lógica común y deja reglas especiales como hooks. |
| `create(payload)` | Limpia payload, ejecuta hooks, llama `Repository.create` y devuelve resultado estándar. | Payload validado por router. | `{ success, message, data }` o error controlado. | Mantiene controllers simples y services consistentes. |
| `update(idOrParams, payload)` | Verifica existencia, limpia payload, ejecuta hooks y actualiza. | Params/id y payload. | Resultado estándar. | Evita actualizar registros inexistentes y conserva flujo uniforme. |
| `get(idOrParams)` | Ejecuta hook opcional, busca registro y responde 404 si no existe. | Params/id. | Resultado estándar con data. | Separa lógica de obtención del controller. |
| `list(query)` | Limpia query, ejecuta hook opcional, lista desde repository y agrega `pagination`. | Query validado. | Resultado con data y pagination. | Da una forma uniforme para tablas, filtros y paginación en el frontend. |
<!-- FUNCTION_DOCS_END -->
