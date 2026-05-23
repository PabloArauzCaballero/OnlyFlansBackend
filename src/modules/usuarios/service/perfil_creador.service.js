const createCrudService = require("../../../shared/service/createCrudService");
const PerfilCreadorRepository = require("../repository/perfil_creador.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "perfil_creador.service" });

const baseService = createCrudService({
  Repository: PerfilCreadorRepository,
  entityName: "perfil_creador",
  serviceName: "perfil_creador.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_usuario) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID de usuario es obligatorio.",
        };
      }

      if (!payload.nombre_publico || payload.nombre_publico.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre público es obligatorio.",
        };
      }

      if (payload.nombre_publico.length > 120) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre público no puede exceder 120 caracteres.",
        };
      }

      if (payload.biografia && payload.biografia.length > 500) {
        return {
          success: false,
          statusCode: 400,
          message: "La biografía no puede exceder 500 caracteres.",
        };
      }

      logger.debug(
        { userId: payload.id_usuario, nombrePublico: payload.nombre_publico },
        "Validación de creación de perfil creador completada"
      );

      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.nombre_publico && payload.nombre_publico.length > 120) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre público no puede exceder 120 caracteres.",
        };
      }

      if (payload.biografia && payload.biografia.length > 500) {
        return {
          success: false,
          statusCode: 400,
          message: "La biografía no puede exceder 500 caracteres.",
        };
      }

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { userId: result.id_usuario, nombrePublico: result.nombre_publico },
        "Perfil de creador creado exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
