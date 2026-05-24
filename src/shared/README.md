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
