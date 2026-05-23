const createCrudService = require("../../../shared/service/createCrudService");
const SesionUsuarioRepository = require("../repository/sesion_usuario.repository");

module.exports = createCrudService({
  Repository: SesionUsuarioRepository,
  entityName: "sesion_usuario",
  serviceName: "sesion_usuario.service",
});
