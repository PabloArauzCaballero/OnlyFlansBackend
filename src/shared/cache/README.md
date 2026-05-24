# Carpeta `src/shared/cache/`

Contiene helpers para trabajar con Redis/cache.

## Archivos

| Archivo | Qué hace |
|---|---|
| `cacheKeys.js` | Centraliza generación de claves de cache. |
| `redis.helper.js` | Envuelve operaciones comunes contra Redis. |

## Relación con Redis

Estos helpers dependen del cliente expuesto por:

```txt
core/redis/redis.config.js
```

Si `REDIS_ENABLED=false`, el cliente puede ser `null`, por lo que los helpers deben comportarse de forma segura sin romper el backend.

## Uso recomendado

Usa esta carpeta para cachear respuestas de lectura o datos que se consultan con frecuencia. No caches datos sensibles ni tokens sin una estrategia clara de expiración.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared/cache`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `cacheKeys.js`: nombres de claves Redis consistentes

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `normalizeQuery(query)` | Ordena claves del query y las concatena como `clave=valor`. | Objeto query. | String determinístico. | Evita que `{limit:20, offset:0}` y `{offset:0, limit:20}` generen claves distintas. |
| `buildCacheKey(entity, action, identifier)` | Construye una clave base `cpa:entidad:accion:identificador`. | Entidad, acción e identificador. | String de cache. | Estandariza todas las claves Redis. |
| `buildListCacheKey(entity, query)` | Genera clave para listados usando query normalizado. | Entidad y query. | Clave para cachear listados. | Permite cachear respuestas paginadas/filtradas sin colisiones. |
| `buildGetCacheKey(entity, id)` | Genera clave para obtener un registro puntual. | Entidad e id. | Clave `get`. | Separa cache de detalle de cache de listado. |
| `buildEntityPattern(entity)` | Genera patrón `cpa:entidad:*`. | Entidad. | Patrón Redis. | Sirve para invalidar todas las claves relacionadas a una entidad. |


### `redis.helper.js`: operaciones seguras de cache

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `getClient()` | Obtiene cliente Redis solo si existe y está abierto. | No recibe parámetros. | Cliente o `null`. | Evita errores cuando Redis está deshabilitado. |
| `serializeCacheValue(value)` | Convierte objetos a JSON y deja strings/buffers como están. | Valor a cachear. | String/buffer o `null`. | Redis guarda strings; esta función normaliza la entrada. |
| `deserializeCacheValue(value)` | Intenta convertir JSON a objeto; si no puede, devuelve el valor original. | Valor leído de Redis. | Objeto, string o `null`. | Permite cachear tanto objetos como textos sin lógica duplicada. |
| `getCache(key)` | Lee una clave Redis y deserializa el valor. | Clave. | Valor cacheado o `null`. | Da una API simple para services/repositories. |
| `setCache(key, value, ttlSeconds)` | Guarda valor serializado con TTL opcional. | Clave, valor y TTL. | Resultado de `client.set` o `null`. | Centraliza expiración de cache y tolera Redis apagado. |
| `deleteCache(key)` | Elimina una clave puntual. | Clave. | Cantidad de claves eliminadas. | Sirve para invalidar cache después de cambios. |
| `deleteCacheByPattern(pattern)` | Recorre claves con `scanIterator` y elimina coincidencias. | Patrón Redis. | Total eliminado. | Permite invalidar varias claves sin bloquear Redis con `KEYS`. |
<!-- FUNCTION_DOCS_END -->
