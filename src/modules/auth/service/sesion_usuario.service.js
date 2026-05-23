const createCrudService = require("../../../shared/service/createCrudService");
const SesionUsuarioRepository = require("../repository/sesion_usuario.repository");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");
const rootLogger = require("../../../../logs/logger");

const logger = rootLogger.child({ module: "sesion_usuario.service" });

const baseService = createCrudService({
  Repository: SesionUsuarioRepository,
  entityName: "sesion_usuario",
  serviceName: "sesion_usuario.service",
});

async function createForLogin({ id_usuario, ip, user_agent }) {
  return baseService.create({
    id_usuario,
    ip: ip || null,
    user_agent: user_agent || null,
  });
}

async function close({ id_sesion, id_usuario }) {
  const startedAt = Date.now();
  const eventName = "sesion_usuario_close";

  try {
    const closedSession = await SesionUsuarioRepository.closeSession({ id_sesion, id_usuario });

    if (!closedSession) {
      return {
        success: false,
        statusCode: 404,
        message: "No se encontró una sesión abierta para cerrar.",
      };
    }

    return {
      success: true,
      message: "Sesión cerrada correctamente.",
      data: closedSession,
    };
  } catch (error) {
    sendServerInternalError(null, logger, eventName, startedAt, "sesion_usuario.service.close", error);

    return {
      success: false,
      statusCode: 500,
      message: "Error interno al cerrar la sesión.",
    };
  }
}

module.exports = {
  ...baseService,
  createForLogin,
  close,
};
