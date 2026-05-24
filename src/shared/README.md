# Carpeta `src/shared/`

Contiene piezas reutilizables que no pertenecen a un único módulo.

## Subcarpetas

| Carpeta | Qué contiene |
|---|---|
| `cache/` | Helpers para cache con Redis. |
| `http/` | Helpers relacionados con request HTTP. |
| `repository/` | Factory genérica de repository CRUD. |
| `service/` | Factory genérica de service CRUD. |
| `utils/` | Utilidades de logging, errores, hashing, transformación y seguridad. |
| `validation/` | Schemas base de Zod y schemas transaccionales. |

## Regla

Antes de copiar lógica entre módulos, revisa si debería vivir aquí. `shared` ayuda a que el backend sea consistente y más fácil de mantener.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/shared`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

Esta carpeta no contiene archivos `.js` directos. Su README documenta estructura, SQL, pruebas o subcarpetas. Para funciones de código, revisar los README de las subcarpetas correspondientes.
<!-- FUNCTION_DOCS_END -->
