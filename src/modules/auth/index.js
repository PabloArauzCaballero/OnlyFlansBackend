const router = require("express").Router();

router.use("/", require("./router/auth.router"));

module.exports = {
  moduleName: "auth",
  basePath: "/api/auth",
  router,
  isPublic: true,
};
