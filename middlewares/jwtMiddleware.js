const { verifyAccessToken } = require("../core/jwt/jwt");

function requireAuth(req, res, next) {
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

    req.user = {
      id_usuario: decoded.id_usuario || decoded.sub || null,
      nombre: decoded.nombre || decoded.nombre_usuario || null,
      email: decoded.email || null,
      rol: decoded.rol || decoded.role || decoded.tipo_usuario || "user",
      role: decoded.role || decoded.rol || decoded.tipo_usuario || "user",
      tokenUse: decoded.tokenUse,
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
