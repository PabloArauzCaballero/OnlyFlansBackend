function getRequestMeta(req = {}) {
  return {
    requestId: req.id || req.requestId || req.headers?.["x-request-id"],
    traceId: req.traceId,
    ip: req.ip,
    method: req.method,
    path: req.originalUrl || req.url,
    userAgent: req.headers?.["user-agent"],
    userId: req.user?.id_usuario || req.user?.idUsuario || req.user?.id || req.user?.user_id || null,
  };
}

module.exports = getRequestMeta;
