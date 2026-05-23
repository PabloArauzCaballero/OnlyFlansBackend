const createCrudService = require("../../../shared/service/createCrudService");
const PublicacionRepository = require("../repository/publicacion.repository");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "publicacion.service" });

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validationErrorResult(message, errors = null) {
  return {
    success: false,
    statusCode: 400,
    message,
    errors,
  };
}

const baseService = createCrudService({
  Repository: PublicacionRepository,
  entityName: "publicacion",
  serviceName: "publicacion.service",
  hooks: {
    beforeCreate: async ({ payload }) => {
      if (!payload.id_creador) {
        return { success: false, statusCode: 400, message: "El ID del creador es obligatorio." };
      }

      if (payload.texto !== undefined && payload.texto !== null && payload.texto.trim().length === 0) {
        return { success: false, statusCode: 400, message: "Si envía texto, no puede estar vacío." };
      }

      if (payload.texto && payload.texto.trim().length > 5000) {
        return { success: false, statusCode: 400, message: "El texto no puede exceder 5000 caracteres." };
      }

      logger.debug({ creadorId: payload.id_creador }, "Validación de creación de publicación completada");
      return { success: true, data: payload };
    },

    beforeUpdate: async ({ payload }) => {
      if (payload.texto !== undefined && payload.texto !== null && payload.texto.trim().length === 0) {
        return { success: false, statusCode: 400, message: "Si envía texto, no puede estar vacío." };
      }

      if (payload.texto && payload.texto.trim().length > 5000) {
        return { success: false, statusCode: 400, message: "El texto no puede exceder 5000 caracteres." };
      }

      logger.debug({ changedFields: Object.keys(payload) }, "Validación de actualización de publicación completada");
      return { success: true, data: payload };
    },

    afterCreate: async ({ result }) => {
      logger.info({ publicacionId: result.id_publicacion, creadorId: result.id_creador }, "Publicación creada exitosamente");
      return { success: true, data: result };
    },
  },
});

async function createWithImages(payload) {
  const startedAt = Date.now();
  const eventName = "publicacion_create_with_images";
  const moduleName = "publicacion.service.createWithImages";

  try {
    if (!isPlainObject(payload)) {
      return validationErrorResult("El payload de creación debe ser un objeto válido.");
    }

    if (!payload.id_creador) {
      return validationErrorResult("El ID del creador es obligatorio.");
    }

    if (!Array.isArray(payload.imagenes) || payload.imagenes.length === 0) {
      return validationErrorResult("Debe enviar al menos una imagen para crear la publicación con imágenes.");
    }

    if (payload.texto !== undefined && payload.texto !== null && payload.texto.trim().length === 0) {
      return validationErrorResult("Si envía texto, no puede estar vacío.");
    }

    if (payload.texto && payload.texto.trim().length > 5000) {
      return validationErrorResult("El texto no puede exceder 5000 caracteres.");
    }

    const usedOrders = new Set();
    const imagenes = payload.imagenes.map((imagen, index) => {
      const orden = imagen.orden || index + 1;

      if (usedOrders.has(orden)) {
        throw Object.assign(new Error("El orden de las imágenes no puede repetirse."), {
          statusCode: 400,
          exposeAsValidation: true,
        });
      }

      usedOrders.add(orden);

      return {
        link_imagen: imagen.link_imagen,
        orden,
      };
    });

    const publicacion = {
      id_creador: payload.id_creador,
      texto: payload.texto ?? null,
      fecha_publicacion: payload.fecha_publicacion,
    };

    Object.keys(publicacion).forEach((key) => {
      if (publicacion[key] === undefined) {
        delete publicacion[key];
      }
    });

    const result = await PublicacionRepository.createWithImages({ publicacion, imagenes });

    logger.info(
      {
        publicacionId: result.id_publicacion,
        creadorId: result.id_creador,
        totalImagenes: result.imagenes.length,
      },
      "Publicación creada con imágenes exitosamente"
    );

    return {
      success: true,
      message: "Publicación creada con imágenes correctamente.",
      data: result,
    };
  } catch (error) {
    if (error.exposeAsValidation || error.statusCode === 400) {
      return validationErrorResult(error.message);
    }

    sendServerInternalError(null, logger, eventName, startedAt, moduleName, error);
    return {
      success: false,
      statusCode: 500,
      message: "Error interno en el servicio al crear la publicación con imágenes.",
    };
  }
}

module.exports = {
  ...baseService,
  createWithImages,
};
