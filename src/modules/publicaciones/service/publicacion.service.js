const createCrudService = require("../../../shared/service/createCrudService");
const PublicacionRepository = require("../repository/publicacion.repository");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "publicacion.service" });

const baseService = createCrudService({
  Repository: PublicacionRepository,
  entityName: "publicacion",
  serviceName: "publicacion.service",
});

function removeUndefinedFields(payload = {}) {
  return Object.entries(payload).reduce((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}

async function createWithImages(payload) {
  const startedAt = Date.now();
  const eventName = "publicacion_create_with_images";
  const moduleName = "publicacion.service.createWithImages";

  try {
    // La forma y reglas del payload ya fueron validadas por Zod en el router.
    // El service solo coordina el caso de uso y prepara los datos para la transacción.
    const publicacion = removeUndefinedFields({
      id_creador: payload.id_creador,
      texto: payload.texto ?? null,
      fecha_publicacion: payload.fecha_publicacion,
      estado_registro: payload.estado_registro,
    });

    const imagenes = payload.imagenes.map((imagen, index) => ({
      link_imagen: imagen.link_imagen,
      orden: imagen.orden ?? index + 1,
      estado_registro: imagen.estado_registro,
    }));

    const result = await PublicacionRepository.createWithImages({ publicacion, imagenes });

    logger.info(
      {
        event: eventName,
        publicacionId: result.id_publicacion,
        creadorId: result.id_creador,
        totalImagenes: result.imagenes.length,
      },
      "Publicación creada con imágenes correctamente"
    );

    return {
      success: true,
      message: "Publicación creada con imágenes correctamente.",
      data: result,
    };
  } catch (error) {
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
