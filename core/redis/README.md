# Carpeta `core/redis/`

Contiene la conexión opcional a Redis.

## Archivo

| Archivo | Qué hace |
|---|---|
| `redis.config.js` | Crea, conecta, expone y desconecta el cliente Redis usando `redis`. |

## Flujo

`server.js` llama:

```js
await connectRedis();
```

La función decide qué hacer según variables de entorno:

| Condición | Resultado |
|---|---|
| `REDIS_ENABLED !== "true"` | No conecta y registra warning `redis_disabled`. |
| `REDIS_ENABLED=true` pero falta `REDIS_URL` | No conecta y registra warning `redis_url_missing`. |
| `REDIS_ENABLED=true` y existe `REDIS_URL` | Crea cliente, registra listeners y ejecuta `redisClient.connect()`. |

## Funciones exportadas

| Función | Recibe | Devuelve | Uso |
|---|---|---|---|
| `connectRedis()` | Nada directamente; usa env. | Cliente Redis o `null`. | Arranque del servidor. |
| `getRedisClient()` | Nada. | Cliente actual o `null`. | Helpers de cache. |
| `disconnectRedis()` | Nada. | Cierre limpio. | Apagado controlado. |

## Cuidado

Si trabajas localmente y no tienes Redis, deja:

```env
REDIS_ENABLED=false
```

Si lo activas sin tener un servidor Redis corriendo, el backend puede fallar al arrancar o registrar errores de conexión.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `core/redis`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `redis.config.js`: conexión opcional a Redis

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `connectRedis()` | Si `REDIS_ENABLED=true`, crea cliente Redis, registra eventos (`error`, `connect`, `ready`, `end`) y ejecuta `.connect()`. | Variables `REDIS_ENABLED` y `REDIS_URL`. | Cliente Redis abierto o `null` si está deshabilitado/no configurado. | Permite que el backend funcione aunque Redis no esté disponible, útil en desarrollo. |
| `getRedisClient()` | Devuelve la instancia actual del cliente Redis. | No recibe parámetros. | Cliente Redis o `null`. | Los helpers de cache lo usan sin crear conexiones nuevas. |
| `disconnectRedis()` | Cierra Redis con `.quit()` si el cliente está abierto. | No recibe parámetros. | Cierra la conexión. | Sirve para apagado controlado y pruebas. |

Decisión importante: Redis es opcional. Si no está habilitado, la API no debería caerse; simplemente no usará cache.
<!-- FUNCTION_DOCS_END -->
