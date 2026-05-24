# Carpeta `docs/`

Contiene documentación técnica y artefactos de soporte para base de datos, rutas y pruebas.

## Subcarpetas

| Carpeta | Contenido | Uso |
|---|---|---|
| `DB/` | Scripts SQL del esquema y parches. | Crear o ajustar la base de datos. |
| `ROUTES DOCS/` | Documentación de endpoints. | Revisar rutas disponibles por módulo. |
| `TEST/` | Colección Postman. | Probar manualmente el backend. |

## Recomendación

Mantén esta carpeta sincronizada con el código. Si agregas, eliminas o cambias una ruta, actualiza también `docs/ROUTES DOCS/ROUTES_ALL_MODULES.md`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `docs`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

Esta carpeta no contiene archivos `.js` directos. Su README documenta estructura, SQL, pruebas o subcarpetas. Para funciones de código, revisar los README de las subcarpetas correspondientes.
<!-- FUNCTION_DOCS_END -->
