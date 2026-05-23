const createCrudService = require("../../../shared/service/createCrudService");
const CreadorFavoritoRepository = require("../repository/creador_favorito.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "creador_favorito.service" });

const baseService = createCrudService({
  Repository: CreadorFavoritoRepository,
  entityName: "creador_favorito",
  serviceName: "creador_favorito.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_seguidor) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID del seguidor es obligatorio.",
        };
      }

      if (!payload.id_creador) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID del creador favorito es obligatorio.",
        };
      }

      if (payload.id_seguidor === payload.id_creador) {
        return {
          success: false,
          statusCode: 400,
          message: "Un usuario no puede agregarse a sí mismo como favorito.",
        };
      }

      logger.debug(
        { seguidorId: payload.id_seguidor, creadorId: payload.id_creador },
        "Validación de creación de favorito completada"
      );

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { favoritoId: result.id_favorito, seguidorId: result.id_seguidor, creadorId: result.id_creador },
        "Creador agregado a favoritos exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
