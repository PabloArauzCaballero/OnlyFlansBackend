const router = require("express").Router();
const SesionUsuarioController = require("../controller/sesion_usuario.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "sesion_usuario.router" });

const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../../../../middlewares/validate.middleware");

const {
  createSchema,
  updateSchema,
  idSchema,
  querySchema,
} = require("../schema/sesion_usuario.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "sesion_usuario_creation"),
  SesionUsuarioController.create
);

router.put(
  "/:id_sesion",
  validateParams(idSchema, logger, "sesion_usuario_update"),
  validateBody(updateSchema, logger, "sesion_usuario_update"),
  SesionUsuarioController.update
);

router.get(
  "/:id_sesion",
  validateParams(idSchema, logger, "sesion_usuario_get"),
  SesionUsuarioController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "sesion_usuario_list"),
  SesionUsuarioController.list
);

module.exports = router;
