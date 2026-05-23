const createCrudService = require("../../../shared/service/createCrudService");
const CreadorSeguidoRepository = require("../repository/creador_seguido.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "creador_seguido.service" });

const baseService = createCrudService({
  Repository: CreadorSeguidoRepository,
  entityName: "creador_seguido",
  serviceName: "creador_seguido.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_seguidor) {
        return { success: false, statusCode: 400, message: "El ID del seguidor es obligatorio." };
      }

      if (!payload.id_creador) {
        return { success: false, statusCode: 400, message: "El ID del creador seguido es obligatorio." };
      }

      if (payload.id_seguidor === payload.id_creador) {
        return { success: false, statusCode: 400, message: "Un usuario no puede seguirse a sí mismo." };
      }

      logger.debug({ seguidorId: payload.id_seguidor, creadorId: payload.id_creador }, "Validación de seguimiento completada");
      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info({ seguimientoId: result.id_seguimiento, seguidorId: result.id_seguidor, creadorId: result.id_creador }, "Creador seguido exitosamente");
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
