const router = require("express").Router();

router.use("/perfiles-creadores", require("./router/perfil_creador.router"));
router.use("/perfiles-seguidores", require("./router/perfil_seguidor.router"));
router.use("/creadores-favoritos", require("./router/creador_favorito.router"));
router.use("/creadores-seguidos", require("./router/creador_seguido.router"));
router.use("/", require("./router/usuario.router"));

module.exports = {
  moduleName: "usuarios",
  basePath: "/api/usuarios",
  router,
  isPublic: true,
};
