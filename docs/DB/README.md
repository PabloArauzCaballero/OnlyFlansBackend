# Carpeta `docs/DB/`

Contiene scripts SQL relacionados con la base de datos PostgreSQL.

## Archivos

| Archivo | Qué hace |
|---|---|
| `DDL.sql` | Script principal de creación del esquema, tablas, constraints e índices. |
| `patch.01.sql` | Parche incremental para ajustar la base sin recrearla completa. |

## Uso

Ejecuta estos scripts en tu cliente PostgreSQL preferido, por ejemplo DBeaver, pgAdmin, psql o Neon SQL Editor.

Orden recomendado para una base nueva:

```txt
1. DDL.sql
2. patch.01.sql si aplica al estado actual del proyecto
```

## Relación con Sequelize

Los modelos en `src/modules/*/model` deben reflejar estas tablas. Si cambias una columna en SQL, revisa también:

- modelo Sequelize;
- schema Zod;
- repository/service si afecta lógica;
- documentación de rutas si cambia el payload.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `docs/DB`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

Esta carpeta no contiene archivos `.js` directos. Su README documenta estructura, SQL, pruebas o subcarpetas. Para funciones de código, revisar los README de las subcarpetas correspondientes.
<!-- FUNCTION_DOCS_END -->
