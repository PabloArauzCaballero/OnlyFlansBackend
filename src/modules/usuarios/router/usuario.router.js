const router = require("express").Router();
const UsuarioController = require("../controller/usuario.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "usuario.router" });

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
} = require("../schema/usuario.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "usuario_creation"),
  UsuarioController.create
);

router.put(
  "/:id_usuario",
  validateParams(idSchema, logger, "usuario_update"),
  validateBody(updateSchema, logger, "usuario_update"),
  UsuarioController.update
);

router.get(
  "/:id_usuario",
  validateParams(idSchema, logger, "usuario_get"),
  UsuarioController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "usuario_list"),
  UsuarioController.list
);

module.exports = router;
