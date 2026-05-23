const router = require("express").Router();

router.use("/sesiones", require("./router/sesion_usuario.router"));
router.use("/logs", require("./router/logs.router"));

module.exports = {
  moduleName: "auth",
  basePath: "/api/auth",
  router,
  isPublic: true,
};
