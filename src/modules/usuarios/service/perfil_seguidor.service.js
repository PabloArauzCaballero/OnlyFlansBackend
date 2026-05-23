const createCrudService = require("../../../shared/service/createCrudService");
const PerfilSeguidorRepository = require("../repository/perfil_seguidor.repository");

module.exports = createCrudService({
  Repository: PerfilSeguidorRepository,
  entityName: "perfil_seguidor",
  serviceName: "perfil_seguidor.service",
});
