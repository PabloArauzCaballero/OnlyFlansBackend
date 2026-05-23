const rootLogger = require("../logs/logger");
const LogsService = require("../src/modules/auth/service/logs.service");

const logger = rootLogger.child({ module: "actionLog.middleware" });

const SENSITIVE_KEYS = new Set([
  "password",
  "password_hash",
  "passwordHash",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
]);

function sanitizeValue(value) {
  if (!value || typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  return Object.entries(value).reduce((acc, [key, item]) => {
    if (SENSITIVE_KEYS.has(key)) {
      acc[key] = "[REDACTED]";
      return acc;
    }

    acc[key] = sanitizeValue(item);
    return acc;
  }, {});
}

function shouldSkip(req) {
  return req.path === "/health" || req.originalUrl?.startsWith("/health");
}

async function actionLogMiddleware(req, res, next) {
  const startedAt = Date.now();

  req.actionLog = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection?.remoteAddress || null,
    userAgent: req.get("user-agent") || null,
    timestamp: new Date(),
  };

  res.on("finish", async () => {
    if (shouldSkip(req)) return;

    const idUsuario = req.user?.id_usuario || req.user?.idUsuario || req.user?.id || null;
    const idSesion = req.session?.id_sesion || req.session?.idSesion || null;

    const metadata = {
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      params: sanitizeValue(req.params),
      query: sanitizeValue(req.query),
      body: sanitizeValue(req.body),
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.actionLog.ip,
      userAgent: req.actionLog.userAgent,
      requestId: req.headers["x-request-id"] || null,
    };

    try {
      const result = await LogsService.recordAction({
        id_sesion: idSesion,
        id_usuario: idUsuario,
        accion: `${req.method} ${req.originalUrl}`,
        metadata,
      });

      if (!result?.success) {
        logger.warn(
          {
            event: "action_log_not_persisted",
            result,
          },
          "No se pudo persistir el log de acción"
        );
      }
    } catch (error) {
      logger.error(
        {
          event: "action_log_error",
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        },
        "Error al persistir log de acción"
      );
    }
  });

  return next();
}

module.exports = actionLogMiddleware;
