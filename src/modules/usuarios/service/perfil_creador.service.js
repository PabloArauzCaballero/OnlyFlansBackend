const createCrudService = require("../../../shared/service/createCrudService");
const PerfilCreadorRepository = require("../repository/perfil_creador.repository");

module.exports = createCrudService({
  Repository: PerfilCreadorRepository,
  entityName: "perfil_creador",
  serviceName: "perfil_creador.service",
});
