const AuthService = require("../service/auth.service");
const rootLogger = require("../../../../logs/logger");
const sendAttemptingRequest = require("../../../shared/utils/sendAttemptingRequest");
const sendRequestFailed = require("../../../shared/utils/sendRequestFailed");
const sendRequestSuccess = require("../../../shared/utils/sendRequestSuccess");
const sendServerInternalError = require("../../../shared/utils/sendServerInternalError");

const logger = rootLogger.child({ module: "auth.controller" });

const ACCESS_COOKIE_NAME = process.env.COOKIE_NAME || "access_token";
const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || "refresh_token";

function getCookieOptions(maxAge) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    maxAge,
    path: "/",
  };
}

function setAuthCookies(res, { accessToken, refreshToken }) {
  res.cookie(
    ACCESS_COOKIE_NAME,
    accessToken,
    getCookieOptions(Number(process.env.COOKIE_MAX_AGE_MS || 15 * 60 * 1000))
  );

  res.cookie(
    REFRESH_COOKIE_NAME,
    refreshToken,
    getCookieOptions(Number(process.env.REFRESH_COOKIE_MAX_AGE_MS || 7 * 24 * 60 * 60 * 1000))
  );
}

function clearAuthCookies(res) {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAME_SITE || "lax",
    path: "/",
  };

  res.clearCookie(ACCESS_COOKIE_NAME, options);
  res.clearCookie(REFRESH_COOKIE_NAME, options);
}

function sendServiceResponse(req, res, loggerEventName, startedAt, result, successStatus = 200) {
  if (!result?.success) {
    sendRequestFailed(req, logger, loggerEventName, {}, startedAt, result);
    return res.status(result?.statusCode || 400).json(result);
  }

  sendRequestSuccess(req, logger, loggerEventName, startedAt, result);
  return res.status(successStatus).json(result);
}

async function registerCreator(req, res) {
  const startedAt = Date.now();
  const eventName = "auth_register_creator";

  try {
    sendAttemptingRequest(req, logger, eventName, {
      body: {
        usuario: { ...req.body.usuario, password: "[REDACTED]" },
        perfil_creador: req.body.perfil_creador,
      },
    });

    const result = await AuthService.registerCreator(req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result, 201);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "auth.controller.registerCreator", error);
    return res.status(500).json({ success: false, message: "Error interno al registrar creador." });
  }
}

async function registerFollower(req, res) {
  const startedAt = Date.now();
  const eventName = "auth_register_follower";

  try {
    sendAttemptingRequest(req, logger, eventName, {
      body: {
        usuario: { ...req.body.usuario, password: "[REDACTED]" },
        perfil_seguidor: req.body.perfil_seguidor,
      },
    });

    const result = await AuthService.registerFollower(req.body);
    return sendServiceResponse(req, res, eventName, startedAt, result, 201);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "auth.controller.registerFollower", error);
    return res.status(500).json({ success: false, message: "Error interno al registrar seguidor." });
  }
}

async function login(req, res) {
  const startedAt = Date.now();
  const eventName = "auth_login";

  try {
    sendAttemptingRequest(req, logger, eventName, {
      body: { email: req.body.email, password: "[REDACTED]" },
    });

    const result = await AuthService.login({
      email: req.body.email,
      password: req.body.password,
      ip: req.ip || req.connection?.remoteAddress || null,
      user_agent: req.get("user-agent") || null,
    });

    if (result?.success) {
      setAuthCookies(res, result.data);
      req.user = result.data.user;
      req.session = result.data.session;
    }

    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "auth.controller.login", error);
    return res.status(500).json({ success: false, message: "Error interno al iniciar sesión." });
  }
}

async function logout(req, res) {
  const startedAt = Date.now();
  const eventName = "auth_logout";

  try {
    sendAttemptingRequest(req, logger, eventName, {
      user: req.user,
      session: req.session,
    });

    const result = await AuthService.logout({
      id_usuario: req.user?.id_usuario || null,
      id_sesion: req.session?.id_sesion || null,
    });

    clearAuthCookies(res);
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "auth.controller.logout", error);
    return res.status(500).json({ success: false, message: "Error interno al cerrar sesión." });
  }
}

async function me(req, res) {
  const startedAt = Date.now();
  const eventName = "auth_me";

  try {
    sendAttemptingRequest(req, logger, eventName, { user: req.user, session: req.session });
    const result = await AuthService.me({ ...req.user, ...req.session });
    return sendServiceResponse(req, res, eventName, startedAt, result);
  } catch (error) {
    sendServerInternalError(req, logger, eventName, startedAt, "auth.controller.me", error);
    return res.status(500).json({ success: false, message: "Error interno al obtener usuario autenticado." });
  }
}

module.exports = {
  registerCreator,
  registerFollower,
  login,
  logout,
  me,
};
