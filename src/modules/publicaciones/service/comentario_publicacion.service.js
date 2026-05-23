const createCrudService = require("../../../shared/service/createCrudService");
const ComentarioPublicacionRepository = require("../repository/comentario_publicacion.repository");

module.exports = createCrudService({
  Repository: ComentarioPublicacionRepository,
  entityName: "comentario_publicacion",
  serviceName: "comentario_publicacion.service",
});
