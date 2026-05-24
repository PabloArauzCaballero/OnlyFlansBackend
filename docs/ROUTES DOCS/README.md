# Carpeta `docs/ROUTES DOCS/`

Contiene documentación específica de rutas HTTP.

## Archivo principal

| Archivo | Qué hace |
|---|---|
| `ROUTES_ALL_MODULES.md` | Lista endpoints por módulo, payloads esperados y notas de comportamiento. |

## Regla de mantenimiento

Cada vez que cambies un archivo en `src/modules/*/router`, revisa este documento.

No documentes como endpoint algo que solo existe como service o repository interno. En el estado actual del backend, `sesion_usuario` y `logs` existen internamente, pero no tienen router público montado.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `docs/ROUTES DOCS`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

Esta carpeta no contiene archivos `.js` directos. Su README documenta estructura, SQL, pruebas o subcarpetas. Para funciones de código, revisar los README de las subcarpetas correspondientes.
<!-- FUNCTION_DOCS_END -->
