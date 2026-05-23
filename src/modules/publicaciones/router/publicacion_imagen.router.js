const router = require("express").Router();
const PublicacionImagenController = require("../controller/publicacion_imagen.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "publicacion_imagen.router" });

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
} = require("../schema/publicacion_imagen.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "publicacion_imagen_creation"),
  PublicacionImagenController.create
);

router.put(
  "/:id_publicacion_imagen",
  validateParams(idSchema, logger, "publicacion_imagen_update"),
  validateBody(updateSchema, logger, "publicacion_imagen_update"),
  PublicacionImagenController.update
);

router.get(
  "/:id_publicacion_imagen",
  validateParams(idSchema, logger, "publicacion_imagen_get"),
  PublicacionImagenController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "publicacion_imagen_list"),
  PublicacionImagenController.list
);

module.exports = router;
