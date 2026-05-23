const createCrudService = require("../../../shared/service/createCrudService");
const MetaApoyoRepository = require("../repository/meta_apoyo.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "meta_apoyo.service" });

const baseService = createCrudService({
  Repository: MetaApoyoRepository,
  entityName: "meta_apoyo",
  serviceName: "meta_apoyo.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_creador) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID del creador es obligatorio.",
        };
      }

      if (!payload.titulo || payload.titulo.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El título de la meta es obligatorio.",
        };
      }

      if (payload.titulo.length > 160) {
        return {
          success: false,
          statusCode: 400,
          message: "El título no puede exceder 160 caracteres.",
        };
      }

      if (!payload.descripcion || payload.descripcion.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "La descripción de la meta es obligatoria.",
        };
      }

      if (payload.descripcion.length > 2000) {
        return {
          success: false,
          statusCode: 400,
          message: "La descripción no puede exceder 2000 caracteres.",
        };
      }

      logger.debug(
        { creadorId: payload.id_creador, titulo: payload.titulo },
        "Validación de creación de meta de apoyo completada"
      );

      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.titulo && payload.titulo.length > 160) {
        return {
          success: false,
          statusCode: 400,
          message: "El título no puede exceder 160 caracteres.",
        };
      }

      if (payload.descripcion && payload.descripcion.length > 2000) {
        return {
          success: false,
          statusCode: 400,
          message: "La descripción no puede exceder 2000 caracteres.",
        };
      }

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { metaId: result.id_meta, creadorId: result.id_creador, titulo: result.titulo },
        "Meta de apoyo creada exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
