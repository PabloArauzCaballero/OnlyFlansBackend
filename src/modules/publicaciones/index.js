const router = require("express").Router();

router.use("/imagenes", require("./router/publicacion_imagen.router"));
router.use("/comentarios", require("./router/comentario_publicacion.router"));
router.use("/", require("./router/publicacion.router"));

module.exports = {
  moduleName: "publicaciones",
  basePath: "/api/publicaciones",
  router,
  isPublic: true,
};
