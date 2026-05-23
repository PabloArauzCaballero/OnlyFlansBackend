const createCrudService = require("../../../shared/service/createCrudService");
const LogsRepository = require("../repository/logs.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "logs.service" });

const baseService = createCrudService({
  Repository: LogsRepository,
  entityName: "logs",
  serviceName: "logs.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (payload.accion !== undefined && payload.accion !== null && payload.accion.trim().length === 0) {
        return { success: false, statusCode: 400, message: "La acción no puede estar vacía." };
      }

      logger.debug(
        { sesionId: payload.id_sesion || null, userId: payload.id_usuario || null, accion: payload.accion || null },
        "Validación de creación de log completada"
      );

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.debug(
        { logId: result.id_log, sesionId: result.id_sesion || null, userId: result.id_usuario || null },
        "Log de auditoría registrado exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
