# `usuarios/controller/`

Contiene controllers HTTP para usuarios, perfiles, favoritos y seguimientos.

## Archivos

| Archivo | Funciones |
|---|---|
| `usuario.controller.js` | `create`, `update`, `get`, `list`. `create` existe pero no está montado en router. |
| `perfil_creador.controller.js` | `create`, `update`, `get`, `list`. `create` existe pero no está montado. |
| `perfil_seguidor.controller.js` | `create`, `update`, `get`, `list`. `create` existe pero no está montado. |
| `creador_favorito.controller.js` | `create`, `update`, `get`, `list`. |
| `creador_seguido.controller.js` | `create`, `update`, `get`, `list`. |

## Responsabilidad

Cada controller:

1. Define `startedAt` y `eventName`.
2. Registra intento con `sendAttemptingRequest`.
3. Llama al service.
4. Usa `sendServiceResponse` para responder status correcto.
5. Captura errores inesperados y responde `500`.

## Qué recibe

Recibe `req.params`, `req.body` y `req.query` ya validados por el router.

## Qué no debe hacer

- No debe acceder directamente a Sequelize.
- No debe duplicar validaciones de Zod.
- No debe construir SQL.
