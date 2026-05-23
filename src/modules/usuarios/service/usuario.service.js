const createCrudService = require("../../../shared/service/createCrudService");
const UsuarioRepository = require("../repository/usuario.repository");

module.exports = createCrudService({
  Repository: UsuarioRepository,
  entityName: "usuario",
  serviceName: "usuario.service",
});
