const router = require("express").Router();
const TipoApoyoController = require("../controller/tipo_apoyo.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "tipo_apoyo.router" });

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
} = require("../schema/tipo_apoyo.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "tipo_apoyo_creation"),
  TipoApoyoController.create
);

router.put(
  "/:id_tipo_apoyo",
  validateParams(idSchema, logger, "tipo_apoyo_update"),
  validateBody(updateSchema, logger, "tipo_apoyo_update"),
  TipoApoyoController.update
);

router.get(
  "/:id_tipo_apoyo",
  validateParams(idSchema, logger, "tipo_apoyo_get"),
  TipoApoyoController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "tipo_apoyo_list"),
  TipoApoyoController.list
);

module.exports = router;
