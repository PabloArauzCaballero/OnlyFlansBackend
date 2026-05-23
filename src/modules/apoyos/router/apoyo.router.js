const router = require("express").Router();
const ApoyoController = require("../controller/apoyo.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "apoyo.router" });

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
} = require("../schema/apoyo.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "apoyo_creation"),
  ApoyoController.create
);

router.put(
  "/:id_apoyo",
  validateParams(idSchema, logger, "apoyo_update"),
  validateBody(updateSchema, logger, "apoyo_update"),
  ApoyoController.update
);

router.get(
  "/:id_apoyo",
  validateParams(idSchema, logger, "apoyo_get"),
  ApoyoController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "apoyo_list"),
  ApoyoController.list
);

module.exports = router;
