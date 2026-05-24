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
