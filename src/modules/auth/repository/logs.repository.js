const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { Logs } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: Logs,
  entity: "logs",
  primaryKeys: ["id_log"],
});
