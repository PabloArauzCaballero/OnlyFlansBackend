const createCrudService = require("../../../shared/service/createCrudService");
const TipoApoyoRepository = require("../repository/tipo_apoyo.repository");

module.exports = createCrudService({
  Repository: TipoApoyoRepository,
  entityName: "tipo_apoyo",
  serviceName: "tipo_apoyo.service",
});
