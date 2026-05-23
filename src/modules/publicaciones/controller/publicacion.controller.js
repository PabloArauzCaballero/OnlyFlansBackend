const PublicacionService = require("../service/publicacion.service");
const rootLogger = require("../../../../logs/logger");
const sendAttemptingRequest = require("../../../shared/utils/sendAttemptingRequest");
const sendRequestFailed = require("../../../shared/utils/sendRequestFailed");
const sendRequestSuccess = require("../../../shared/utils/sendRequestSuccess");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");

const logger = rootLogger.child({ module: "publicacion.controller" });

function sendServiceResponse(req, res, loggerEventName, startedAt, result, successStatus = 200) {
  if (!result?.success) {
    sendRequestFailed(req, logger, loggerEventName, {}, startedAt, result);

    return res.status(result?.statusCode || 400).json(result);
  }

  sendRequestSuccess(req, logger, loggerEventName, startedAt, result);

  return res.status(successStatus).json(result);
}

// Reglas de negocio específicas de publicacion:
// - Validación de creador requerido
// - Validación de texto opcional no vacío
// - Límite de 5000 caracteres para texto
// - Creación transaccional de publicación con imágenes mediante POST /con-imagenes
async function create(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_create";

  try {
    sendAttemptingRequest(req, logger, eventName, { body: req.body });
    const result = await PublicacionService.create(req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result, 201);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion.controller.create", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al crear el registro.",
    });
  }
}

async function createWithImages(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_create_with_images";

  try {
    sendAttemptingRequest(req, logger, eventName, { body: req.body });
    const result = await PublicacionService.createWithImages(req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result, 201);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion.controller.createWithImages", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al crear la publicación con imágenes.",
    });
  }
}

async function update(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_update";

  try {
    sendAttemptingRequest(req, logger, eventName, { params: req.params, body: req.body });
    const result = await PublicacionService.update(req.params, req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion.controller.update", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al actualizar el registro.",
    });
  }
}

async function get(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_get";

  try {
    sendAttemptingRequest(req, logger, eventName, { params: req.params });
    const result = await PublicacionService.get(req.params);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion.controller.get", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al obtener el registro.",
    });
  }
}

async function list(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_list";

  try {
    sendAttemptingRequest(req, logger, eventName, { query: req.query });
    const result = await PublicacionService.list(req.query);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion.controller.list", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al listar registros.",
    });
  }
}

module.exports = {
  create,
  createWithImages,
  update,
  get,
  list,
};
