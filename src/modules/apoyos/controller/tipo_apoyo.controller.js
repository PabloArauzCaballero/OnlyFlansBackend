const TipoApoyoService = require("../service/tipo_apoyo.service");
const rootLogger = require("../../../../logs/logger");
const sendAttemptingRequest = require("../../../shared/utils/sendAttemptingRequest");
const sendRequestFailed = require("../../../shared/utils/sendRequestFailed");
const sendRequestSuccess = require("../../../shared/utils/sendRequestSuccess");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");

const logger = rootLogger.child({ module: "tipo_apoyo.controller" });

function sendServiceResponse(req, res, loggerEventName, startedAt, result, successStatus = 200) {
  if (!result?.success) {
    sendRequestFailed(req, logger, loggerEventName, {}, startedAt, result);

    return res.status(result?.statusCode || 400).json(result);
  }

  sendRequestSuccess(req, logger, loggerEventName, startedAt, result);

  return res.status(successStatus).json(result);
}

// Reglas de negocio específicas de tipo_apoyo:
// - Validación de código obligatorio y único (máx 40 caracteres)
// - Validación de nombre obligatorio (máx 100 caracteres)
// - Validación de monto unitario positivo
// - Auditoría de creación de tipos de apoyo
async function create(req, res) {
  const startedAt = Date.now();
  const eventName = "tipo_apoyo_create";

  try {
    sendAttemptingRequest(req, logger, eventName, { body: req.body });
    const result = await TipoApoyoService.create(req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result, 201);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "tipo_apoyo.controller.create", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al crear el registro.",
    });
  }
}

async function update(req, res) {
  const startedAt = Date.now();
  const eventName = "tipo_apoyo_update";

  try {
    sendAttemptingRequest(req, logger, eventName, { params: req.params, body: req.body });
    const result = await TipoApoyoService.update(req.params, req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "tipo_apoyo.controller.update", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al actualizar el registro.",
    });
  }
}

async function get(req, res) {
  const startedAt = Date.now();
  const eventName = "tipo_apoyo_get";

  try {
    sendAttemptingRequest(req, logger, eventName, { params: req.params });
    const result = await TipoApoyoService.get(req.params);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "tipo_apoyo.controller.get", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al obtener el registro.",
    });
  }
}

async function list(req, res) {
  const startedAt = Date.now();
  const eventName = "tipo_apoyo_list";

  try {
    sendAttemptingRequest(req, logger, eventName, { query: req.query });
    const result = await TipoApoyoService.list(req.query);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "tipo_apoyo.controller.list", error);

    return res.status(500).json({
      success: false,
      message: "Error interno al listar registros.",
    });
  }
}

module.exports = {
  create,
  update,
  get,
  list,
};
