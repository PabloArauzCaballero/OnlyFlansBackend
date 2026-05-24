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

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared/utils`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `addAuditCreateFields.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `addAuditCreateFields(Model, data)` | Agrega `fecha_registro`, `fecha_actualizacion`, `version=1` y `estado_registro="ACTIVO"` si el modelo tiene esos atributos y no vinieron en el payload. | Modelo Sequelize y datos. | Copia del payload con campos de auditoría. | Permite preparar auditoría de creación sin asumir que todas las tablas tienen las mismas columnas. |


### `addAuditUpdateFields.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `addAuditUpdateFields(Model, data)` | Agrega `fecha_actualizacion` si falta y aumenta `version` si vino en payload. | Modelo Sequelize y datos. | Copia del payload actualizada. | Ayuda a mantener auditoría en updates sin romper modelos que no tengan esos campos. |


### `emptyResultFromRepo.js`

Este archivo exporta un objeto constante, no una función.

| Export | Qué hace | Por qué existe |
|---|---|---|
| `{ success:false, message:"Empty result from repository." }` | Representa un resultado vacío de repository. | Puede usarse como fallback común cuando una operación no devuelve datos. |


### `getRequestMeta.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `getRequestMeta(req)` | Extrae `requestId`, `traceId`, `ip`, método, ruta, user-agent y userId. | Request Express. | Objeto de metadata. | Estandariza los campos que se mandan a Pino en todos los logs. |


### `getUserId.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `getAuthUserId(req)` | Busca el id del usuario autenticado en varias propiedades posibles de `req.user` o `req`. | Request Express. | Id del usuario o `null`. | Da compatibilidad entre distintos nombres de campo (`id_usuario`, `idUsuario`, `id`, `user_id`). |


### `hasAttribute.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `hasAttribute(Model, attributeName)` | Verifica si `Model.rawAttributes` contiene el atributo indicado. | Modelo Sequelize y nombre de atributo. | Boolean. | Evita filtrar, ordenar o auditar columnas inexistentes. |


### `passwordHash.js`: hashing y verificación de contraseñas

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `hashPassword(password)` | Genera salt aleatorio y hash PBKDF2-SHA256 con 310000 iteraciones. | Contraseña en texto plano. | String `pbkdf2_sha256$iteraciones$salt$hash`. | Las contraseñas nunca deben guardarse en texto plano ni con hash rápido simple. |
| `verifyPbkdf2(password, storedHash)` | Recalcula PBKDF2 con salt/iteraciones del hash guardado y compara. | Password ingresado y hash guardado. | Boolean. | Permite autenticar sin revelar ni desencriptar la contraseña. |
| `verifyLegacySha256(password, storedHash)` | Verifica hashes antiguos SHA-256 simples. | Password y hash legacy. | Boolean. | Mantiene compatibilidad con usuarios creados antes de PBKDF2. |
| `verifyPassword(password, storedHash)` | Decide si debe verificar PBKDF2 o legacy SHA-256. | Password y hash guardado. | Boolean. | Da una única función pública para login. |


### `removeSensitiveFields.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `removeSensitiveFields(user)` | Copia el usuario y elimina campos como `password`, `password_hash`, `token`, `token_hash`, etc.; también limpia `persona` si existe. | Objeto usuario. | Usuario sanitizado o `null`. | Evita enviar secretos al frontend, logs o tokens. |


### `safeCompare.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `safeCompare(valueA, valueB)` | Compara dos valores usando `crypto.timingSafeEqual` si tienen la misma longitud. | Dos valores. | Boolean. | Reduce riesgo de ataques por timing al comparar hashes o secretos. |


### `sendAttemptingRequest.js`

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sendAttemptingRequest(req, loggerObj, eventName, data)` | Registra log informativo antes de ejecutar una acción. | Request, logger, nombre de evento y datos. | Escribe log Pino. | Permite ver intención de operación incluso si luego falla. |


### `sendRequestFailed.js`

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sendRequestFailed(req, loggerObj, eventName, data, startedAt, serviceResult)` | Registra warning cuando un service devuelve `success:false`. | Request, logger, evento, datos, inicio y resultado. | Log con status, razón, errores y duración. | Diferencia errores controlados de errores inesperados 500. |


### `sendRequestSuccess.js`

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sendRequestSuccess(req, loggerObj, eventName, startedAt, serviceResult)` | Registra log de éxito con metadata y duración. | Request, logger, evento, inicio y resultado. | Log Pino informativo. | Permite medir y auditar operaciones correctas. |


### `sendRequestValidationError.js`

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sendRequestValidationError(req, loggerObj, eventName, startedAt, schemaResult)` | Registra warning cuando Zod rechaza body/params/query. | Request, logger, evento, inicio y resultado Zod. | Log con `validationErrors`. | Facilita detectar payloads incorrectos sin ensuciar controllers. |


### `sendServerInternalError.js`

| Función | Qué hace | Recibe | Devuelve / efecto | Por qué existe |
|---|---|---|---|---|
| `sendServerInternalError(req, loggerObj, eventName, startedAt, moduleName, error)` | Registra error inesperado con stack trace y duración. | Request opcional, logger, evento, inicio, módulo y error. | Log Pino de nivel error. | Centraliza logging de fallos internos y evita perder trazabilidad. |


### `toPlain.js`

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `toPlain(user)` | Si el objeto tiene `.get`, llama `.get({ plain:true })`; si no, copia el objeto. | Instancia Sequelize u objeto. | Objeto plano o `null`. | Los resultados de Sequelize no deberían salir directamente a controllers/respuestas. |


### `tokenCrypto.js`: cifrado simétrico de texto

| Función | Qué hace | Recibe | Devuelve | Por qué existe |
|---|---|---|---|---|
| `getKey()` | Lee `TOKEN_ENCRYPTION_KEY`, la interpreta como hex y exige 32 bytes. | Variable de entorno. | Buffer de 32 bytes o lanza error. | AES-256-GCM necesita una llave de 256 bits válida. |
| `encryptText(text)` | Cifra texto con AES-256-GCM, IV aleatorio y auth tag. | Texto plano. | Payload `iv:authTag:cifrado` en hex. | Permite guardar tokens/textos sensibles cifrados. |
| `decryptText(payload)` | Descifra payload generado por `encryptText`. | String `iv:authTag:cifrado`. | Texto plano. | Recupera datos cifrados verificando autenticidad con GCM. |
<!-- FUNCTION_DOCS_END -->
