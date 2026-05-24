# `auth/schema/`

Define schemas Zod relacionados con auth, sesiones y logs.

## Archivos

| Archivo | Qué valida |
|---|---|
| `auth.schema.js` | Reexporta schemas de registro y login desde `shared/validation/flows.schema.js`. |
| `sesion_usuario.schema.js` | Payloads de sesión para uso interno o futuro router. |
| `logs.schema.js` | Payloads de logs para uso interno o futuro router. |

## Schemas públicos usados por router

| Schema | Endpoint |
|---|---|
| `registrarCreadorSchema` | `POST /api/auth/registro/creador` |
| `registrarSeguidorSchema` | `POST /api/auth/registro/seguidor` |
| `loginSchema` | `POST /api/auth/login` |

## Registro de creador

Espera:

```json
{
  "usuario": {
    "nombre": "string requerido",
    "email": "email válido",
    "password": "mínimo 8 caracteres",
    "url_imagen_portada": "url opcional",
    "imagen_perfil": "url opcional"
  },
  "perfil_creador": {
    "nombre_publico": "string requerido",
    "biografia": "texto opcional",
    "foto_perfil_url": "url opcional",
    "banner_url": "url opcional"
  }
}
```

## Registro de seguidor

Espera:

```json
{
  "usuario": {
    "nombre": "string requerido",
    "email": "email válido",
    "password": "mínimo 8 caracteres"
  },
  "perfil_seguidor": {
    "nombre_visible": "string requerido"
  }
}
```

## Login

Espera:

```json
{
  "email": "email válido",
  "password": "mínimo 8 caracteres"
}
```
