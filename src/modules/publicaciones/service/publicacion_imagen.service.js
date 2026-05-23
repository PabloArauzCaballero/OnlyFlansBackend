const createCrudService = require("../../../shared/service/createCrudService");
const PublicacionImagenRepository = require("../repository/publicacion_imagen.repository");

module.exports = createCrudService({
  Repository: PublicacionImagenRepository,
  entityName: "publicacion_imagen",
  serviceName: "publicacion_imagen.service",
});
