const router = require("express").Router();
const MetaApoyoController = require("../controller/meta_apoyo.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "meta_apoyo.router" });

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
} = require("../schema/meta_apoyo.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "meta_apoyo_creation"),
  MetaApoyoController.create
);

router.put(
  "/:id_meta",
  validateParams(idSchema, logger, "meta_apoyo_update"),
  validateBody(updateSchema, logger, "meta_apoyo_update"),
  MetaApoyoController.update
);

router.get(
  "/:id_meta",
  validateParams(idSchema, logger, "meta_apoyo_get"),
  MetaApoyoController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "meta_apoyo_list"),
  MetaApoyoController.list
);

module.exports = router;
