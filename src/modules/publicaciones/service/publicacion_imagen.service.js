const createCrudService = require("../../../shared/service/createCrudService");
const PublicacionImagenRepository = require("../repository/publicacion_imagen.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "publicacion_imagen.service" });

const baseService = createCrudService({
  Repository: PublicacionImagenRepository,
  entityName: "publicacion_imagen",
  serviceName: "publicacion_imagen.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_publicacion) {
        return { success: false, statusCode: 400, message: "El ID de la publicación es obligatorio." };
      }

      if (!payload.link_imagen || payload.link_imagen.trim().length === 0) {
        return { success: false, statusCode: 400, message: "El link de imagen es obligatorio." };
      }

      if (payload.orden !== undefined && payload.orden <= 0) {
        return { success: false, statusCode: 400, message: "El orden debe ser mayor a 0." };
      }

      logger.debug({ publicacionId: payload.id_publicacion, orden: payload.orden || 1 }, "Validación de creación de imagen de publicación completada");
      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.link_imagen !== undefined && payload.link_imagen.trim().length === 0) {
        return { success: false, statusCode: 400, message: "El link de imagen no puede estar vacío." };
      }

      if (payload.orden !== undefined && payload.orden <= 0) {
        return { success: false, statusCode: 400, message: "El orden debe ser mayor a 0." };
      }

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info({ publicacionImagenId: result.id_publicacion_imagen, publicacionId: result.id_publicacion }, "Imagen de publicación creada exitosamente");
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
