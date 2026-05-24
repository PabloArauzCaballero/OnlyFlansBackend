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
