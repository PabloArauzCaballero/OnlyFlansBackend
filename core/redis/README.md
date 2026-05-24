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
