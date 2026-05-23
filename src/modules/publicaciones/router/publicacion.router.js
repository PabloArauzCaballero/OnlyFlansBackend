const router = require("express").Router();
const PublicacionController = require("../controller/publicacion.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "publicacion.router" });

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
} = require("../schema/publicacion.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "publicacion_creation"),
  PublicacionController.create
);

router.put(
  "/:id_publicacion",
  validateParams(idSchema, logger, "publicacion_update"),
  validateBody(updateSchema, logger, "publicacion_update"),
  PublicacionController.update
);

router.get(
  "/:id_publicacion",
  validateParams(idSchema, logger, "publicacion_get"),
  PublicacionController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "publicacion_list"),
  PublicacionController.list
);

module.exports = router;
