const createCrudService = require("../../../shared/service/createCrudService");
const ApoyoRepository = require("../repository/apoyo.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "apoyo.service" });

const baseService = createCrudService({
  Repository: ApoyoRepository,
  entityName: "apoyo",
  serviceName: "apoyo.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_seguidor) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID del seguidor es obligatorio.",
        };
      }

      if (!payload.id_creador) {
        return {
          success: false,
          statusCode: 400,
          message: "El ID del creador es obligatorio.",
        };
      }

      if (!payload.id_tipo_apoyo) {
        return {
          success: false,
          statusCode: 400,
          message: "El tipo de apoyo es obligatorio.",
        };
      }

      if (!payload.cantidad || payload.cantidad <= 0) {
        return {
          success: false,
          statusCode: 400,
          message: "La cantidad debe ser mayor a 0.",
        };
      }

      if (!payload.monto_unitario_bs || payload.monto_unitario_bs <= 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El monto unitario debe ser mayor a 0.",
        };
      }

      if (payload.mensaje && payload.mensaje.length > 500) {
        return {
          success: false,
          statusCode: 400,
          message: "El mensaje no puede exceder 500 caracteres.",
        };
      }

      logger.debug(
        { seguidorId: payload.id_seguidor, creadorId: payload.id_creador, cantidad: payload.cantidad },
        "Validación de creación de apoyo completada"
      );

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { apoyoId: result.id_apoyo, seguidorId: result.id_seguidor, montoTotal: result.monto_total_bs },
        "Apoyo registrado exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
