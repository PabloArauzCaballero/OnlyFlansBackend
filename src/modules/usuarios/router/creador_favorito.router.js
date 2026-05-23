const router = require("express").Router();
const CreadorFavoritoController = require("../controller/creador_favorito.controller");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "creador_favorito.router" });

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
} = require("../schema/creador_favorito.schema");

router.post(
  "/",
  validateBody(createSchema, logger, "creador_favorito_creation"),
  CreadorFavoritoController.create
);

router.put(
  "/:id_favorito",
  validateParams(idSchema, logger, "creador_favorito_update"),
  validateBody(updateSchema, logger, "creador_favorito_update"),
  CreadorFavoritoController.update
);

router.get(
  "/:id_favorito",
  validateParams(idSchema, logger, "creador_favorito_get"),
  CreadorFavoritoController.get
);

router.get(
  "/",
  validateQuery(querySchema, logger, "creador_favorito_list"),
  CreadorFavoritoController.list
);

module.exports = router;
