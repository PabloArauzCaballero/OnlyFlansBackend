# Carpeta `core/sha2/`

Contiene un helper simple de SHA-256.

## Archivo

| Archivo | Qué hace |
|---|---|
| `sha2.js` | Expone una función de hashing SHA-256. |

## Uso recomendado

Puede servir para generar hashes técnicos simples. No debe usarse como mecanismo principal para contraseñas si ya existe un helper específico de password en `src/shared/utils/passwordHash.js`.

Para contraseñas, usa siempre el flujo de auth actual:

```txt
AuthService → hashPassword / verifyPassword
```
