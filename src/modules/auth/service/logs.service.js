const createCrudService = require("../../../shared/service/createCrudService");
const LogsRepository = require("../repository/logs.repository");

const baseService = createCrudService({
  Repository: LogsRepository,
  entityName: "logs",
  serviceName: "logs.service",
});

async function recordAction({ id_sesion = null, id_usuario = null, accion = null, metadata = null }) {
  return baseService.create({
    id_sesion,
    id_usuario,
    accion,
    metadata,
  });
}

module.exports = {
  ...baseService,
  recordAction,
};
