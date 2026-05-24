# Carpeta `src/modules/`

Agrupa los módulos funcionales del backend. Cada módulo tiene su propio `index.js` y normalmente las carpetas `router`, `controller`, `service`, `repository`, `model` y `schema`.

## Módulos actuales

| Módulo | Base path | Responsabilidad |
|---|---|---|
| `auth` | `/api/auth` | Registro, login, logout, usuario autenticado, sesiones y logs internos. |
| `usuarios` | `/api/usuarios` | Consulta/actualización de usuarios, perfiles, favoritos y seguimientos. |
| `apoyos` | `/api/apoyos` | Tipos de apoyo, metas de apoyo y apoyos económicos simulados. |
| `publicaciones` | `/api/publicaciones` | Publicaciones, imágenes y comentarios. |

## Archivo `index.js`

Exporta un array de módulos:

```js
module.exports = [
  require("./auth"),
  require("./usuarios"),
  require("./apoyos"),
  require("./publicaciones"),
];
```

`app.js` recorre esta lista y monta cada router en su `basePath`.

## Contrato de un módulo

Cada módulo exporta algo como:

```js
module.exports = {
  moduleName: "usuarios",
  basePath: "/api/usuarios",
  router,
  isPublic: true,
};
```

| Propiedad | Uso |
|---|---|
| `moduleName` | Nombre técnico del módulo. |
| `basePath` | Ruta base usada por Express. |
| `router` | Router principal del módulo. |
| `isPublic` | Bandera informativa. Actualmente no aplica seguridad automática. |

<!-- FUNCTION_DOCS_START -->
## Explicación de funciones y comportamiento del código

Esta sección documenta los archivos JavaScript directos de `src/modules`. La intención es que un desarrollador nuevo entienda qué hace cada función, qué recibe y por qué está separada en esta capa.

### `index.js`

Este archivo no define funciones; exporta el arreglo de módulos que `app.js` recorre para montar rutas.

| Export | Qué hace | Por qué existe |
|---|---|---|
| `module.exports = [authModule, usuariosModule, publicacionesModule, apoyosModule]` | Lista los módulos activos de la API. | Permite habilitar/montar módulos desde un solo lugar sin modificar el pipeline principal de Express. |
<!-- FUNCTION_DOCS_END -->
