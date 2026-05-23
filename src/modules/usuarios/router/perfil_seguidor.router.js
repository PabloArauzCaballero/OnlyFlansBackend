const router = require("express").Router();
const PerfilSeguidorController = require("../controller/perfil_seguidor.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "perfil_seguidor.router" });

const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../../../../middlewares/validate.middleware");

const {
  updateSchema,
  idSchema,
  querySchema,
} = require("../schema/perfil_seguidor.schema");


router.put(
  "/:id_usuario",
  validateParams(idSchema, logger, "perfil_seguidor_update"),
  validateBody(updateSchema, logger, "perfil_seguidor_update"),
  PerfilSeguidorController.update
);

router.get(
  "/:id_usuario",
  validateParams(idSchema, logger, "perfil_seguidor_get"),
  PerfilSeguidorController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "perfil_seguidor_list"),
  PerfilSeguidorController.list
);

module.exports = router;
