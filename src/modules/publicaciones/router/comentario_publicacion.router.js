const router = require("express").Router();
const ComentarioPublicacionController = require("../controller/comentario_publicacion.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "comentario_publicacion.router" });

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
} = require("../schema/comentario_publicacion.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "comentario_publicacion_creation"),
  ComentarioPublicacionController.create
);

router.put(
  "/:id_comentario",
  validateParams(idSchema, logger, "comentario_publicacion_update"),
  validateBody(updateSchema, logger, "comentario_publicacion_update"),
  ComentarioPublicacionController.update
);

router.get(
  "/:id_comentario",
  validateParams(idSchema, logger, "comentario_publicacion_get"),
  ComentarioPublicacionController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "comentario_publicacion_list"),
  ComentarioPublicacionController.list
);

module.exports = router;
