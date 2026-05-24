# Carpeta `logs/`

Contiene la configuración del logger de la aplicación.

## Archivos

| Archivo | Qué hace |
|---|---|
| `logger.js` | Configura Pino como logger raíz del backend. |
| `app.log` | Archivo generado en ejecución. No debería versionarse. |

## Cómo se usa

Cada capa crea loggers hijos para identificar el módulo:

```js
const rootLogger = require("../../../../logs/logger");
const logger = rootLogger.child({ module: "auth.controller" });
```

Esto permite que los logs indiquen claramente desde qué archivo o capa se generó el evento.

## Configuración

| Variable | Uso |
|---|---|
| `LOG_LEVEL` | Nivel mínimo de log. Por defecto `info`. |
| `LOG_FILE` | Archivo destino. Por defecto `./logs/app.log`. |

## Cuidado

No subas archivos `.log` al repositorio. El `.gitignore` ya ignora `logs/*.log`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `logs`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `logger.js`: logger raíz con Pino

Este archivo exporta una instancia de Pino, no una función.

| Elemento | Qué hace | Por qué existe |
|---|---|---|
| `pino({ name, level, transport })` | Crea logger llamado `onlyflans-api`, con nivel tomado de `LOG_LEVEL` y salida a archivo `LOG_FILE`. | Centraliza logs estructurados en una sola herramienta. |
| `transport: pino/file` | Guarda logs en archivo y crea carpeta si no existe. | Útil para revisar errores y auditoría local o en servidor. |
| `module.exports = logger` | Exporta el logger base. | Otros archivos crean loggers hijos con `logger.child({ module })` para identificar origen. |
<!-- FUNCTION_DOCS_END -->
