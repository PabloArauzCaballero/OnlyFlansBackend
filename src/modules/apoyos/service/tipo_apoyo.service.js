const createCrudService = require("../../../shared/service/createCrudService");
const TipoApoyoRepository = require("../repository/tipo_apoyo.repository");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "tipo_apoyo.service" });

const baseService = createCrudService({
  Repository: TipoApoyoRepository,
  entityName: "tipo_apoyo",
  serviceName: "tipo_apoyo.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.codigo || payload.codigo.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El código de tipo de apoyo es obligatorio.",
        };
      }

      if (payload.codigo.length > 40) {
        return {
          success: false,
          statusCode: 400,
          message: "El código no puede exceder 40 caracteres.",
        };
      }

      if (!payload.nombre || payload.nombre.trim().length === 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre del tipo de apoyo es obligatorio.",
        };
      }

      if (payload.nombre.length > 100) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre no puede exceder 100 caracteres.",
        };
      }

      if (!payload.monto_unitario_bs || payload.monto_unitario_bs <= 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El monto unitario debe ser mayor a 0.",
        };
      }

      logger.debug(
        { codigo: payload.codigo, nombre: payload.nombre, monto: payload.monto_unitario_bs },
        "Validación de creación de tipo de apoyo completada"
      );

      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.monto_unitario_bs && payload.monto_unitario_bs <= 0) {
        return {
          success: false,
          statusCode: 400,
          message: "El monto unitario debe ser mayor a 0.",
        };
      }

      if (payload.nombre && payload.nombre.length > 100) {
        return {
          success: false,
          statusCode: 400,
          message: "El nombre no puede exceder 100 caracteres.",
        };
      }

      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info(
        { tipoApoyoId: result.id_tipo_apoyo, codigo: result.codigo, nombre: result.nombre },
        "Tipo de apoyo creado exitosamente"
      );
      return { success: true, data: result };
    },
  },
});

module.exports = baseService;
