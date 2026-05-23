const createCrudService = require("../../../shared/service/createCrudService");
const PublicacionRepository = require("../repository/publicacion.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "publicacion.service" });

const baseService = createCrudService({
  Repository: PublicacionRepository,
  entityName: "publicacion",
  serviceName: "publicacion.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_creador) {
        return { success: false, statusCode: 400, message: "El ID del creador es obligatorio." };
      }

      if (payload.texto !== undefined && payload.texto !== null && payload.texto.trim().length === 0) {
        return { success: false, statusCode: 400, message: "Si envía texto, no puede estar vacío." };
      }

      if (payload.texto && payload.texto.trim().length > 5000) {
        return { success: false, statusCode: 400, message: "El texto no puede exceder 5000 caracteres." };
      }

      logger.debug({ creadorId: payload.id_creador }, "Validación de creación de publicación completada");
      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.texto !== undefined && payload.texto !== null && payload.texto.trim().length === 0) {
        return { success: false, statusCode: 400, message: "Si envía texto, no puede estar vacío." };
      }

      if (payload.texto && payload.texto.trim().length > 5000) {
        return { success: false, statusCode: 400, message: "El texto no puede exceder 5000 caracteres." };
      }

      logger.debug({ changedFields: Object.keys(payload) }, "Validación de actualización de publicación completada");
      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info({ publicacionId: result.id_publicacion, creadorId: result.id_creador }, "Publicación creada exitosamente");
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
