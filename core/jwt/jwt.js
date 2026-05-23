const jwt = require("jsonwebtoken");

function normalizeUserForToken(user = {}) {
  const idUsuario = user.id_usuario || user.idUsuario || user.id || user.sub || null;

  return {
    sub: idUsuario,
    id_usuario: idUsuario,
    nombre: user.nombre || user.nombre_usuario || null,
    email: user.email || null,
    rol: user.rol || user.role || user.tipo_usuario || "user",
  };
}

function generateAccessToken(user) {
  return jwt.sign(
    {
      ...normalizeUserForToken(user),
      tokenUse: "access",
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      ...normalizeUserForToken(user),
      tokenUse: "refresh",
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
}

function generateSessionToken(sesion) {
  return jwt.sign(
    {
      sub: sesion,
      tokenUse: "session",
    },
    process.env.SESSION_TOKEN,
    {
      expiresIn: process.env.SESSION_TOKEN_EXPIRES_IN || "8h",
    }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateSessionToken,
};
