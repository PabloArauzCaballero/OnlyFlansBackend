# Carpeta `src/shared/utils/`

Contiene utilidades pequeñas usadas por controllers, services, middlewares y repositories.

## Tipos de helpers

| Tipo | Ejemplos | Para qué sirven |
|---|---|---|
| Logging | `sendAttemptingRequest`, `sendRequestSuccess`, `sendRequestFailed`, `sendServerInternalError`, `sendRequestValidationError` | Estandarizar eventos de logs. |
| Auditoría | `addAuditCreateFields`, `addAuditUpdateFields`, `getUserId` | Preparar campos o identificar usuario. |
| Seguridad | `passwordHash`, `safeCompare`, `removeSensitiveFields`, `tokenCrypto` | Evitar exposición de secretos y comparar datos sensibles. |
| Transformación | `toPlain`, `emptyResultFromRepo`, `hasAttribute` | Convertir Sequelize a objeto plano y validar atributos. |
| Request | `getRequestMeta` | Extraer método, ruta, IP y user agent. |

## Regla

Los utils deben ser simples y reutilizables. Si una función empieza a depender de una entidad concreta, probablemente pertenece al módulo de esa entidad y no a `shared/utils`.
