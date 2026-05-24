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
