const createCrudService = require("../../../shared/service/createCrudService");
const CreadorSeguidoRepository = require("../repository/creador_seguido.repository");

module.exports = createCrudService({
  Repository: CreadorSeguidoRepository,
  entityName: "creador_seguido",
  serviceName: "creador_seguido.service",
});
