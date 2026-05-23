const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { TipoApoyo } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: TipoApoyo,
  entity: "tipo_apoyo",
  primaryKeys: ["id_tipo_apoyo"],
});
