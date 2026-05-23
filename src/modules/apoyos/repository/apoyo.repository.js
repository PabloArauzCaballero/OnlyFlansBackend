const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { Apoyo } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: Apoyo,
  entity: "apoyo",
  primaryKeys: ["id_apoyo"],
});
