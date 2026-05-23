const createCrudService = require("../../../shared/service/createCrudService");
const ApoyoRepository = require("../repository/apoyo.repository");

module.exports = createCrudService({
  Repository: ApoyoRepository,
  entityName: "apoyo",
  serviceName: "apoyo.service",
});
