const createCrudService = require("../../../shared/service/createCrudService");
const ComentarioPublicacionRepository = require("../repository/comentario_publicacion.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "comentario_publicacion.service" });

const baseService = createCrudService({
  Repository: ComentarioPublicacionRepository,
  entityName: "comentario_publicacion",
  serviceName: "comentario_publicacion.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_publicacion) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID de publicación es obligatorio.",
        };
      }

      if (!payload.id_seguidor) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID del seguidor es obligatorio.",
        };
      }

      if (!payload.comentario || payload.comentario.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El comentario no puede estar vacío.",
        };
      }

      if (payload.comentario.trim().length > 1000) {
        return {
          success: false,
          statusCode: 400,
          message: "El comentario no puede exceder 1000 caracteres.",
        };
      }

      logger.debug(
        { publicacionId: payload.id_publicacion, seguidorId: payload.id_seguidor },
        "Validación de creación de comentario completada"
      );

      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.comentario && payload.comentario.trim().length > 1000) {
        return {
          success: false,
          statusCode: 400,
          message: "El comentario no puede exceder 1000 caracteres.",
        };
      }

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { comentarioId: result.id_comentario, publicacionId: result.id_publicacion },
        "Comentario creado exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
