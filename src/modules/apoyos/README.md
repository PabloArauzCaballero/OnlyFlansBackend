# Módulo `apoyos`

Base path: `/api/apoyos`

Administra tipos de apoyo, metas de apoyo y apoyos realizados por seguidores a creadores.

## Rutas expuestas

### Tipos de apoyo

```txt
POST /api/apoyos/tipos
PUT  /api/apoyos/tipos/:id_tipo_apoyo
GET  /api/apoyos/tipos/:id_tipo_apoyo
GET  /api/apoyos/tipos
```

### Metas de apoyo

```txt
POST /api/apoyos/metas
PUT  /api/apoyos/metas/:id_meta
GET  /api/apoyos/metas/:id_meta
GET  /api/apoyos/metas
```

### Apoyos

```txt
POST /api/apoyos
PUT  /api/apoyos/:id_apoyo
GET  /api/apoyos/:id_apoyo
GET  /api/apoyos
```

## Entidades

| Entidad | Descripción |
|---|---|
| `tipo_apoyo` | Catálogo de apoyos disponibles con monto unitario. |
| `meta_apoyo` | Meta creada por un creador. |
| `apoyo` | Apoyo realizado por un seguidor hacia un creador. |

## Regla importante

`monto_total_bs` no debe recibirse desde el cliente. Es una columna calculada por base de datos como `cantidad * monto_unitario_bs`.

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules/apoyos`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `index.js`

Este archivo no define funciones; exporta la configuración que `app.js` usa para montar el módulo.

| Export | Qué hace | Por qué existe |
|---|---|---|
| `moduleName` | Nombre lógico del módulo. | Permite construir rutas y logs consistentes. |
| `basePath` | Ruta base bajo `/api/...`. | Evita hardcodear rutas en `app.js`. |
| `router` | Router Express agregado del módulo. | Centraliza endpoints del módulo. |
<!-- FUNCTION_DOCS_END -->
