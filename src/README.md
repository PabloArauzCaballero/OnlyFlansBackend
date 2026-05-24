# Carpeta `src/`

Contiene el código principal de dominio y utilidades compartidas del backend.

## Subcarpetas

| Carpeta | Qué contiene |
|---|---|
| `modules/` | Módulos funcionales del sistema: auth, usuarios, apoyos y publicaciones. |
| `shared/` | Funciones, validaciones, repositories y services reutilizables. |

## Regla de organización

- Si el código pertenece a un caso de uso específico, va en `modules`.
- Si el código puede ser usado por varios módulos, va en `shared`.
- Si el código es infraestructura base, va en `core`, no en `src`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

Esta carpeta no contiene archivos `.js` directos. Su README documenta estructura, SQL, pruebas o subcarpetas. Para funciones de código, revisar los README de las subcarpetas correspondientes.
<!-- FUNCTION_DOCS_END -->
