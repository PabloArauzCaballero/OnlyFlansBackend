const AuthRepository = require("../repository/auth.repository");
const SesionUsuarioService = require("./sesion_usuario.service");
const LogsService = require("./logs.service");
const { hashPassword, verifyPassword } = require("../../../shared/utils/passwordHash");
const removeSensitiveFields = require("../../../shared/utils/removeSensitiveFields");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");
const rootLogger = require("../../../../logs/logger");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../../core/jwt/jwt");

const logger = rootLogger.child({ module: "auth.service" });

function normalizeUser(user) {
  return removeSensitiveFields(user, ["password_hash", "passwordHash", "password"]);
}

function databaseErrorResult(error) {
  if (error?.name === "SequelizeUniqueConstraintError") {
    return {
      success: false,
      statusCode: 409,
      message: "Ya existe un usuario registrado con ese correo.",
      errors: error.errors?.map((item) => ({
        field: item.path,
        message: item.message,
        value: item.value,
      })) || null,
    };
  }

  if (error?.name === "SequelizeForeignKeyConstraintError") {
    return {
      success: false,
      statusCode: 409,
      message: "No se pudo completar la operación porque una referencia relacionada no existe.",
      errors: {
        table: error.table || null,
        fields: error.fields || null,
        constraint: error.index || error.constraint || null,
      },
    };
  }

  return null;
}

function buildAuthTokens(user, session) {
  const tokenPayload = {
    ...user,
    id_sesion: session?.id_sesion || null,
  };

  return {
    accessToken: generateAccessToken(tokenPayload),
    refreshToken: generateRefreshToken(tokenPayload),
  };
}

async function registerCreator(payload) {
  const startedAt = Date.now();
  const eventName = "auth_register_creator";

  try {
    const result = await AuthRepository.createCreatorAccount({
      usuario: {
        nombre: payload.usuario.nombre,
        email: payload.usuario.email,
        password_hash: hashPassword(payload.usuario.password),
        rol: "CREADOR",
        url_imagen_portada: payload.usuario.url_imagen_portada || null,
        imagen_perfil: payload.usuario.imagen_perfil || null,
      },
      perfil_creador: {
        nombre_publico: payload.perfil_creador.nombre_publico,
        biografia: payload.perfil_creador.biografia || null,
        foto_perfil_url: payload.perfil_creador.foto_perfil_url || null,
        banner_url: payload.perfil_creador.banner_url || null,
      },
    });

    await LogsService.recordAction({
      id_usuario: result.usuario.id_usuario,
      accion: "REGISTRO_CREADOR",
      metadata: {
        email: result.usuario.email,
        rol: result.usuario.rol,
      },
    });

    return {
      success: true,
      message: "Usuario creador registrado correctamente.",
      data: result,
    };
  } catch (error) {
    const handledError = databaseErrorResult(error);
    if (handledError) return handledError;

    sendServerInternalError(null, logger, eventName, startedAt, "auth.service.registerCreator", error);

    return {
      success: false,
      statusCode: 500,
      message: "Error interno al registrar el usuario creador.",
    };
  }
}

async function registerFollower(payload) {
  const startedAt = Date.now();
  const eventName = "auth_register_follower";

  try {
    const result = await AuthRepository.createFollowerAccount({
      usuario: {
        nombre: payload.usuario.nombre,
        email: payload.usuario.email,
        password_hash: hashPassword(payload.usuario.password),
        rol: "SEGUIDOR",
        url_imagen_portada: payload.usuario.url_imagen_portada || null,
        imagen_perfil: payload.usuario.imagen_perfil || null,
      },
      perfil_seguidor: {
        nombre_visible: payload.perfil_seguidor.nombre_visible,
      },
    });

    await LogsService.recordAction({
      id_usuario: result.usuario.id_usuario,
      accion: "REGISTRO_SEGUIDOR",
      metadata: {
        email: result.usuario.email,
        rol: result.usuario.rol,
      },
    });

    return {
      success: true,
      message: "Usuario seguidor registrado correctamente.",
      data: result,
    };
  } catch (error) {
    const handledError = databaseErrorResult(error);
    if (handledError) return handledError;

    sendServerInternalError(null, logger, eventName, startedAt, "auth.service.registerFollower", error);

    return {
      success: false,
      statusCode: 500,
      message: "Error interno al registrar el usuario seguidor.",
    };
  }
}

async function login({ email, password, ip, user_agent }) {
  const startedAt = Date.now();
  const eventName = "auth_login";

  try {
    const user = await AuthRepository.findActiveUserByEmail(email);

    if (!user || !verifyPassword(password, user.password_hash)) {
      return {
        success: false,
        statusCode: 401,
        message: "Credenciales inválidas.",
      };
    }

    const publicUser = normalizeUser(user);
    const sessionResult = await SesionUsuarioService.createForLogin({
      id_usuario: publicUser.id_usuario,
      ip,
      user_agent,
    });

    if (!sessionResult.success) {
      return sessionResult;
    }

    await AuthRepository.updateLastLogin(publicUser.id_usuario);

    const session = sessionResult.data;
    const tokens = buildAuthTokens(publicUser, session);

    await LogsService.recordAction({
      id_usuario: publicUser.id_usuario,
      id_sesion: session.id_sesion,
      accion: "LOGIN",
      metadata: {
        email: publicUser.email,
        rol: publicUser.rol,
        ip: ip || null,
      },
    });

    return {
      success: true,
      message: "Inicio de sesión correcto.",
      data: {
        user: publicUser,
        session: {
          id_sesion: session.id_sesion,
          fecha_inicio: session.fecha_inicio,
        },
        ...tokens,
      },
    };
  } catch (error) {
    sendServerInternalError(null, logger, eventName, startedAt, "auth.service.login", error);

    return {
      success: false,
      statusCode: 500,
      message: "Error interno al iniciar sesión.",
    };
  }
}

async function logout({ id_usuario, id_sesion }) {
  const startedAt = Date.now();
  const eventName = "auth_logout";

  try {
    let closedSession = null;

    if (id_sesion) {
      const closeResult = await SesionUsuarioService.close({ id_sesion, id_usuario });
      if (closeResult.success) {
        closedSession = closeResult.data;
      }
    }

    await LogsService.recordAction({
      id_usuario: id_usuario || null,
      id_sesion: id_sesion || null,
      accion: "LOGOUT",
      metadata: {
        closed: Boolean(closedSession),
      },
    });

    return {
      success: true,
      message: "Sesión cerrada correctamente.",
      data: {
        session: closedSession,
      },
    };
  } catch (error) {
    sendServerInternalError(null, logger, eventName, startedAt, "auth.service.logout", error);

    return {
      success: false,
      statusCode: 500,
      message: "Error interno al cerrar sesión.",
    };
  }
}

async function me(userFromToken) {
  const startedAt = Date.now();
  const eventName = "auth_me";

  try {
    const user = await AuthRepository.findActiveUserById(userFromToken.id_usuario);

    if (!user) {
      return {
        success: false,
        statusCode: 404,
        message: "Usuario no encontrado o inactivo.",
      };
    }

    return {
      success: true,
      message: "Usuario autenticado obtenido correctamente.",
      data: {
        user,
        session: userFromToken.id_sesion
          ? { id_sesion: userFromToken.id_sesion }
          : null,
      },
    };
  } catch (error) {
    sendServerInternalError(null, logger, eventName, startedAt, "auth.service.me", error);

    return {
      success: false,
      statusCode: 500,
      message: "Error interno al obtener el usuario autenticado.",
    };
  }
}

module.exports = {
  registerCreator,
  registerFollower,
  login,
  logout,
  me,
};
