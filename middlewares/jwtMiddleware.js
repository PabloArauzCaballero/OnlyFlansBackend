const { verifyAccessToken } = require("../core/jwt/jwt");
const { SesionUsuario } = require("../core/db/db.associations");

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    const tokenFromHeader =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const tokenFromCookie = req.cookies?.access_token;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No autorizado. Token de acceso no proporcionado.",
      });
    }

    const decoded = verifyAccessToken(token);

    if (decoded.tokenUse && decoded.tokenUse !== "access") {
      return res.status(401).json({
        success: false,
        message: "Token inválido para acceso.",
      });
    }

    const idUsuario = decoded.id_usuario || decoded.sub || null;
    const idSesion = decoded.id_sesion || null;

    if (!idUsuario || !idSesion) {
      return res.status(401).json({
        success: false,
        message: "Token inválido. No contiene usuario o sesión.",
      });
    }

    const activeSession = await SesionUsuario.findOne({
      where: {
        id_sesion: idSesion,
        id_usuario: idUsuario,
        fecha_cierre: null,
        estado_registro: "ACTIVO",
      },
    });

    if (!activeSession) {
      return res.status(401).json({
        success: false,
        message: "Sesión inválida, cerrada o expirada.",
      });
    }

    req.user = {
      id_usuario: idUsuario,
      nombre: decoded.nombre || decoded.nombre_usuario || null,
      email: decoded.email || null,
      rol: decoded.rol || decoded.role || decoded.tipo_usuario || "user",
      role: decoded.role || decoded.rol || decoded.tipo_usuario || "user",
      tokenUse: decoded.tokenUse,
    };

    req.session = {
      id_sesion: idSesion,
    };

    return next();
  } catch (_error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o expirado.",
    });
  }
}

module.exports = {
  requireAuth,
};
