function getAuthUserId(req = {}) {
  return (
    req.user?.id_usuario ||
    req.user?.idUsuario ||
    req.user?.id ||
    req.user?.user_id ||
    req.id_usuario ||
    null
  );
}

module.exports = getAuthUserId;
