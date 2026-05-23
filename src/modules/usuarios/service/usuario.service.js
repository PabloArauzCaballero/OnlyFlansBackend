const createCrudService = require("../../../shared/service/createCrudService");
const UsuarioRepository = require("../repository/usuario.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "usuario.service" });
const VALID_ROLES = ["CREADOR", "SEGUIDOR"];

const baseService = createCrudService({
  Repository: UsuarioRepository,
  entityName: "usuario",
  serviceName: "usuario.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.nombre || payload.nombre.trim().length === 0) {
        return { success: false, statusCode: 400, message: "El nombre del usuario es obligatorio." };
      }

      if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        return { success: false, statusCode: 400, message: "El email es inválido." };
      }

      if (!payload.password_hash || payload.password_hash.length < 8) {
        return { success: false, statusCode: 400, message: "La contraseña o hash debe tener al menos 8 caracteres." };
      }

      if (!VALID_ROLES.includes(payload.rol)) {
        return { success: false, statusCode: 400, message: "El rol debe ser CREADOR o SEGUIDOR." };
      }

      logger.debug({ email: payload.email, rol: payload.rol }, "Validación de creación de usuario completada");
      return { success: true, data: payload };
    },

    beforeUpdate: async ({ idOrParams, payload }) => {
      if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
        return { success: false, statusCode: 400, message: "El email es inválido." };
      }

      if (payload.rol && !VALID_ROLES.includes(payload.rol)) {
        return { success: false, statusCode: 400, message: "El rol debe ser CREADOR o SEGUIDOR." };
      }

      logger.debug({ userId: idOrParams.id_usuario, changedFields: Object.keys(payload) }, "Validación de actualización de usuario completada");
      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info({ userId: result.id_usuario, email: result.email }, "Usuario creado exitosamente");
      return { success: true, data: result };
    },

    afterUpdate: async ({ result }) => {
      logger.info({ userId: result.id_usuario }, "Usuario actualizado exitosamente");
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
