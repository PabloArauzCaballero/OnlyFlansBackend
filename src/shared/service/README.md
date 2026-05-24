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
