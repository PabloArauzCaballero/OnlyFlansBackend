const PublicacionImagenService = require("../service/publicacion_imagen.service");
const rootLogger = require("../../../../logs/logger");
const sendAttemptingRequest = require("../../../shared/utils/sendAttemptingRequest");
const sendRequestFailed = require("../../../shared/utils/sendRequestFailed");
const sendRequestSuccess = require("../../../shared/utils/sendRequestSuccess");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");

const logger = rootLogger.child({ module: "publicacion_imagen.controller" });

function sendServiceResponse(req, res, loggerEventName, startedAt, result, successStatus = 200) {
  if (!result?.success) {
    sendRequestFailed(req, logger, loggerEventName, {}, startedAt, result);
    return res.status(result?.statusCode || 400).json(result);
  }

  sendRequestSuccess(req, logger, loggerEventName, startedAt, result);
  return res.status(successStatus).json(result);
}

// TODO: Agregar aquí reglas de negocio específicas de publicacion_imagen cuando el flujo funcional lo requiera.
async function create(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_imagen_create";

  try {
    sendAttemptingRequest(req, logger, eventName, { body: req.body });
    const result = await PublicacionImagenService.create(req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result, 201);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion_imagen.controller.create", error);
    return res.status(500).json({ success: false, message: "Error interno al crear el registro." });
  }
}

async function update(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_imagen_update";

  try {
    sendAttemptingRequest(req, logger, eventName, { params: req.params, body: req.body });
    const result = await PublicacionImagenService.update(req.params, req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion_imagen.controller.update", error);
    return res.status(500).json({ success: false, message: "Error interno al actualizar el registro." });
  }
}

async function get(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_imagen_get";

  try {
    sendAttemptingRequest(req, logger, eventName, { params: req.params });
    const result = await PublicacionImagenService.get(req.params);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion_imagen.controller.get", error);
    return res.status(500).json({ success: false, message: "Error interno al obtener el registro." });
  }
}

async function list(req, res) {
  const startedAt = Date.now();
  const eventName = "publicacion_imagen_list";

  try {
    sendAttemptingRequest(req, logger, eventName, { query: req.query });
    const result = await PublicacionImagenService.list(req.query);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "publicacion_imagen.controller.list", error);
    return res.status(500).json({ success: false, message: "Error interno al listar registros." });
  }
}

module.exports = { create, update, get, list };
