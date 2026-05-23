const createCrudService = require("../../../shared/service/createCrudService");
const SesionUsuarioRepository = require("../repository/sesion_usuario.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "sesion_usuario.service" });

const baseService = createCrudService({
  Repository: SesionUsuarioRepository,
  entityName: "sesion_usuario",
  serviceName: "sesion_usuario.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_usuario) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID de usuario es obligatorio.",
        };
      }

      logger.debug(
        { userId: payload.id_usuario, ip: payload.ip },
        "Validación de creación de sesión completada"
      );

      return { success: true, data: payload };
    },

    beforeUpdate: async ({ idOrParams, payload }) => {
      if (payload.fecha_cierre && !payload.id_sesion && !idOrParams.id_sesion) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID de sesión es requerido para cerrar sesión.",
        };
      }

      logger.debug(
        { sessionId: idOrParams.id_sesion },
        "Validación de actualización de sesión completada"
      );

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { sesionId: result.id_sesion, userId: result.id_usuario, ip: result.ip },
        "Sesión creada exitosamente"
      );
      return { success: true, data: result };
    },

    afterUpdate: async ({ result }) => {
      if (result.fecha_cierre) {
        logger.info(
          { sesionId: result.id_sesion, userId: result.id_usuario },
          "Sesión cerrada exitosamente"
        );
      }
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
