# Carpeta `src/shared/validation/`

Contiene validaciones Zod reutilizables.

## Archivos

| Archivo | Qué hace |
|---|---|
| `common.schema.js` | Schemas base: IDs, strings, fechas, enums, auditoría y query de listado. |
| `flows.schema.js` | Schemas para flujos transaccionales que involucran más de una tabla. |

## `common.schema.js`

Incluye helpers como:

| Helper | Uso |
|---|---|
| `idBigIntSchema` | IDs positivos coercionados a número. |
| `requiredString(max)` | String obligatorio con trim y longitud máxima. |
| `optionalString(max)` | String opcional/nullable. |
| `requiredText()` | Texto obligatorio. |
| `optionalText()` | Texto opcional/nullable. |
| `optionalNonEmptyText()` | Texto opcional, pero si llega no puede estar vacío. |
| `optionalUrl()` | URL opcional/nullable. |
| `dateTimeSchema` | Fecha coercionada con Zod. |
| `decimalPositiveSchema` | Decimal positivo como número o string. |
| `listQuerySchema` | Query común de listados. |
| `requireAtLeastOneField(schema)` | Obliga que un update tenga al menos un campo. |

## Enums actuales

| Schema | Valores |
|---|---|
| `estadoRegistroSchema` | `ACTIVO`, `INACTIVO`, `ELIMINADO`. |
| `rolUsuarioSchema` | `CREADOR`, `SEGUIDOR`. |
| `estadoPagoSchema` | `PENDIENTE`, `SIMULADO_APROBADO`, `ANULADO`. |

## `flows.schema.js`

Valida payloads que no corresponden a una sola tabla, por ejemplo:

- registro de creador: `usuario + perfil_creador`;
- registro de seguidor: `usuario + perfil_seguidor`;
- login;
- publicación con imágenes;
- flujos transaccionales auxiliares.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared/validation`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `common.schema.js`: bloques Zod reutilizables

| Función / schema | Qué hace | Por qué existe |
|---|---|---|
| `estadoRegistroSchema` | Enum `ACTIVO`, `INACTIVO`, `ELIMINADO`. | Estandariza estados de auditoría. |
| `rolUsuarioSchema` | Enum `CREADOR`, `SEGUIDOR`. | Evita roles fuera del dominio. |
| `estadoPagoSchema` | Enum `PENDIENTE`, `SIMULADO_APROBADO`, `ANULADO`. | Normaliza estados de pago/apoyo. |
| `idBigIntSchema` | Convierte a número entero positivo. | Los ids llegan como string desde params/query. |
| `requiredString(max)` | Crea string obligatorio con trim, min 1 y máximo configurable. | Evita repetir validaciones de texto corto. |
| `optionalString(max)` | Crea string opcional/nullable con máximo. | Para campos no obligatorios. |
| `requiredText()` | Texto obligatorio sin máximo fijo. | Para descripciones/contenidos largos obligatorios. |
| `optionalText()` | Texto opcional/nullable. | Para biografías, mensajes o textos libres. |
| `optionalNonEmptyText()` | Texto opcional, pero si viene no puede estar vacío. | Evita updates con strings vacíos cuando deberían omitirse. |
| `requiredUrlOrText()` | Exige texto no vacío sin forzar formato URL. | Permite links o rutas mientras se define almacenamiento final. |
| `optionalUrl()` | URL opcional/nullable validada. | Para imágenes y banners. |
| `decimalPositiveSchema` | Acepta número o string decimal positivo y lo transforma a string. | Sequelize/PostgreSQL suelen manejar DECIMAL como string para precisión. |
| `auditCreateOptionalSchema` | Campos de auditoría opcionales en creación. | Permite compatibilidad con defaults de DB/backend. |
| `auditUpdateOptionalSchema` | Campos de auditoría opcionales en actualización. | Controla campos comunes de modificación. |
| `listQuerySchema` | Valida `limit`, `offset`, `search`, `orderBy`, `orderDir`, `estado_registro`. | Base común para endpoints `GET /`. |
| `requireAtLeastOneField(schema)` | Refina schema para exigir al menos una propiedad. | Evita updates vacíos. |


### `flows.schema.js`: schemas para casos transaccionales

Estos schemas no representan una sola tabla; validan payloads que terminan creando o modificando varias entidades en una transacción.

| Schema | Qué valida | Por qué existe |
|---|---|---|
| `passwordSchema` | Contraseña de 8 a 100 caracteres. | Base para registro y login. |
| `usuarioPublicoSchema` | Datos públicos de usuario: nombre, email, password, portada y perfil. | Evita duplicar estructura entre creador y seguidor. |
| `registrarCreadorSchema` | `{ usuario, perfil_creador }` con rol `CREADOR`. | Garantiza que no se cree un usuario creador sin su perfil. |
| `registrarSeguidorSchema` | `{ usuario, perfil_seguidor }` con rol `SEGUIDOR`. | Garantiza que no se cree un usuario seguidor sin su perfil. |
| `loginSchema` | Email y password. | Entrada única para autenticación. |
| `iniciarSesionConLogSchema` | Datos para abrir sesión y registrar log. | Documenta flujo interno de sesión + auditoría. |
| `cerrarSesionConLogSchema` | Datos para cerrar sesión y registrar log. | Documenta flujo interno de logout + auditoría. |
| `crearApoyoTransaccionalSchema` | Apoyo completo con datos de pago/log opcional. | Sirve para flujos donde un apoyo puede requerir varias acciones. |
| `publicacionImagenInputSchema` | Imagen de publicación con link y orden opcional. | Reutilizable dentro de publicaciones con imágenes. |
| `crearPublicacionConImagenesSchema` | Publicación con texto y/o imágenes; exige al menos uno. | Evita publicaciones vacías. |
| `crearPublicacionConMetaOpcionalSchema` | Publicación con imágenes más una meta opcional. | Soporta flujos combinados sin crear múltiples schemas sueltos. |
<!-- FUNCTION_DOCS_END -->
