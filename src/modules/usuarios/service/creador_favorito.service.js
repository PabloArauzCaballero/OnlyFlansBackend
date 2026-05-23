const createCrudService = require("../../../shared/service/createCrudService");
const CreadorFavoritoRepository = require("../repository/creador_favorito.repository");

module.exports = createCrudService({
  Repository: CreadorFavoritoRepository,
  entityName: "creador_favorito",
  serviceName: "creador_favorito.service",
});
