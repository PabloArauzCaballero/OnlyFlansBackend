const createCrudService = require("../../../shared/service/createCrudService");
const MetaApoyoRepository = require("../repository/meta_apoyo.repository");

module.exports = createCrudService({
  Repository: MetaApoyoRepository,
  entityName: "meta_apoyo",
  serviceName: "meta_apoyo.service",
});
