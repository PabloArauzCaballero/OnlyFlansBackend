const router = require("express").Router();
const CreadorSeguidoController = require("../controller/creador_seguido.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "creador_seguido.router" });

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
} = require("../schema/creador_seguido.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "creador_seguido_creation"),
  CreadorSeguidoController.create
);

router.put(
  "/:id_seguimiento",
  validateParams(idSchema, logger, "creador_seguido_update"),
  validateBody(updateSchema, logger, "creador_seguido_update"),
  CreadorSeguidoController.update
);

router.get(
  "/:id_seguimiento",
  validateParams(idSchema, logger, "creador_seguido_get"),
  CreadorSeguidoController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "creador_seguido_list"),
  CreadorSeguidoController.list
);

module.exports = router;
