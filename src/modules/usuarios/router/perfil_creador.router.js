const router = require("express").Router();
const PerfilCreadorController = require("../controller/perfil_creador.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "perfil_creador.router" });

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
} = require("../schema/perfil_creador.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "perfil_creador_creation"),
  PerfilCreadorController.create
);

router.put(
  "/:id_usuario",
  validateParams(idSchema, logger, "perfil_creador_update"),
  validateBody(updateSchema, logger, "perfil_creador_update"),
  PerfilCreadorController.update
);

router.get(
  "/:id_usuario",
  validateParams(idSchema, logger, "perfil_creador_get"),
  PerfilCreadorController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "perfil_creador_list"),
  PerfilCreadorController.list
);

module.exports = router;
