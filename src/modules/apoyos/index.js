const router = require("express").Router();

router.use("/tipos", require("./router/tipo_apoyo.router"));
router.use("/metas", require("./router/meta_apoyo.router"));
router.use("/", require("./router/apoyo.router"));

module.exports = {
  moduleName: "apoyos",
  basePath: "/api/apoyos",
  router,
  isPublic: true,
};
