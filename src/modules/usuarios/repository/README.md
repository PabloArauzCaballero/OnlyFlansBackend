# `usuarios/repository/`

Contiene repositories CRUD que conectan services con modelos Sequelize.

## Archivos

| Archivo | Modelo | Primary key |
|---|---|---|
| `usuario.repository.js` | `Usuario` | `id_usuario` |
| `perfil_creador.repository.js` | `PerfilCreador` | `id_usuario` |
| `perfil_seguidor.repository.js` | `PerfilSeguidor` | `id_usuario` |
| `creador_favorito.repository.js` | `CreadorFavorito` | `id_favorito` |
| `creador_seguido.repository.js` | `CreadorSeguido` | `id_seguimiento` |

Todos usan `createCrudRepository`.

## Responsabilidad

- Ejecutar operaciones Sequelize.
- Devolver objetos planos.
- Aplicar filtros permitidos en listados.
- No conocer nada sobre `req` o `res`.
