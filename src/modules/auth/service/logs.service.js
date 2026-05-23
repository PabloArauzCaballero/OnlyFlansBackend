const createCrudService = require("../../../shared/service/createCrudService");
const LogsRepository = require("../repository/logs.repository");

module.exports = createCrudService({
  Repository: LogsRepository,
  entityName: "logs",
  serviceName: "logs.service",
});
