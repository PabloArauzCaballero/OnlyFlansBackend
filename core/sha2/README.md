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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `core/sha2`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `sha2.js`: helper de SHA-256

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `sha2Encode(str)` | Calcula SHA-256 en hexadecimal para un string. | Texto de entrada. | Hash hexadecimal de 64 caracteres. | Se mantiene como compatibilidad y helper simple; para contraseñas nuevas se prefiere `passwordHash.js` con PBKDF2. |
<!-- FUNCTION_DOCS_END -->
