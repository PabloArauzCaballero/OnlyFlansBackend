const rootLogger = require("../logs/logger");

const logger = rootLogger.child({ module: "actionLog.middleware" });

async function actionLogMiddleware(req, _res, next) {
  try {
    req.actionLog = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("user-agent"),
      timestamp: new Date(),
      id_sesion: req.session?.id_sesion || req.session?.idSesion || null,
      id_usuario: req.user?.id_usuario || req.user?.idUsuario || req.user?.id || null,
    };

    logger.debug(
      {
        event: "action_log_recorded",
        method: req.actionLog.method,
        url: req.actionLog.url,
        ip: req.actionLog.ip,
        id_usuario: req.actionLog.id_usuario,
        id_sesion: req.actionLog.id_sesion,
      },
      "Acción registrada para auditoría"
    );
  } catch (error) {
    logger.error(
      {
        event: "action_log_error",
        error: error.message,
      },
      "Error al registrar acción para auditoría"
    );
  }

  return next();
}

module.exports = actionLogMiddleware;
