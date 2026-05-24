# Carpeta `src/shared/http/`

Contiene helpers relacionados con información HTTP.

## Archivo

| Archivo | Qué hace |
|---|---|
| `getIPAdress.js` | Ayuda a obtener la IP del request. |

## Uso

Sirve para logging, auditoría o registro de sesiones cuando se necesita guardar la IP del usuario.

## Cuidado

Si la aplicación está detrás de proxy o plataforma cloud, recuerda que `app.js` usa:

```js
app.set("trust proxy", true);
```

Eso ayuda a Express a interpretar correctamente IPs reenviadas por proxies.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared/http`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `getIPAdress.js`: obtención de IP cliente

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `getClientIp(req)` | Lee primero `x-forwarded-for`; si no existe usa `req.ip` o `req.socket.remoteAddress`. | Request Express. | IP del cliente o `null`. | En despliegues detrás de proxy/load balancer, la IP real suele venir en `x-forwarded-for`. |
<!-- FUNCTION_DOCS_END -->
