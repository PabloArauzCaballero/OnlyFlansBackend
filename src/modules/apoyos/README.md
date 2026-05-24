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
