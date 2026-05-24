# Carpeta `docs/ROUTES DOCS/`

Contiene documentación específica de rutas HTTP.

## Archivo principal

| Archivo | Qué hace |
|---|---|
| `ROUTES_ALL_MODULES.md` | Lista endpoints por módulo, payloads esperados y notas de comportamiento. |

## Regla de mantenimiento

Cada vez que cambies un archivo en `src/modules/*/router`, revisa este documento.

No documentes como endpoint algo que solo existe como service o repository interno. En el estado actual del backend, `sesion_usuario` y `logs` existen internamente, pero no tienen router público montado.
