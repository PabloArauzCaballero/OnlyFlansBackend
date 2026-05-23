const router = require("express").Router();
const LogsController = require("../controller/logs.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "logs.router" });

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
} = require("../schema/logs.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "logs_creation"),
  LogsController.create
);

router.put(
  "/:id_log",
  validateParams(idSchema, logger, "logs_update"),
  validateBody(updateSchema, logger, "logs_update"),
  LogsController.update
);

router.get(
  "/:id_log",
  validateParams(idSchema, logger, "logs_get"),
  LogsController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "logs_list"),
  LogsController.list
);

module.exports = router;
