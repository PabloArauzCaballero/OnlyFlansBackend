# Carpeta `docs/TEST/`

Contiene artefactos para probar el backend.

## Archivo

| Archivo | Qué hace |
|---|---|
| `OnlyFlans_API_Tests.postman_collection.json` | Colección Postman para ejecutar pruebas manuales de endpoints. |

## Uso recomendado

1. Levanta el backend con `yarn dev`.
2. Importa la colección en Postman.
3. Configura una variable de entorno para la URL base, por ejemplo `http://localhost:3000`.
4. Ejecuta primero `/health`.
5. Prueba registro, login y luego rutas dependientes de usuarios/perfiles.

## Cuidado

Si cambias rutas en código, actualiza también la colección. Una colección desactualizada hace perder tiempo durante testing.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `docs/TEST`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

Esta carpeta no contiene archivos `.js` directos. Su README documenta estructura, SQL, pruebas o subcarpetas. Para funciones de código, revisar los README de las subcarpetas correspondientes.
<!-- FUNCTION_DOCS_END -->
