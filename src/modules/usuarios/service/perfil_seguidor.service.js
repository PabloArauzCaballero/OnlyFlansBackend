const createCrudService = require("../../../shared/service/createCrudService");
const PerfilSeguidorRepository = require("../repository/perfil_seguidor.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "perfil_seguidor.service" });

const baseService = createCrudService({
  Repository: PerfilSeguidorRepository,
  entityName: "perfil_seguidor",
  serviceName: "perfil_seguidor.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_usuario) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID de usuario es obligatorio.",
        };
      }

      if (!payload.nombre_visible || payload.nombre_visible.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre visible es obligatorio.",
        };
      }

      if (payload.nombre_visible.length > 120) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre visible no puede exceder 120 caracteres.",
        };
      }

      logger.debug(
        { userId: payload.id_usuario, nombreVisible: payload.nombre_visible },
        "Validación de creación de perfil seguidor completada"
      );

      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.nombre_visible && payload.nombre_visible.length > 120) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre visible no puede exceder 120 caracteres.",
        };
      }

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { userId: result.id_usuario, nombreVisible: result.nombre_visible },
        "Perfil de seguidor creado exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
