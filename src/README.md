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
