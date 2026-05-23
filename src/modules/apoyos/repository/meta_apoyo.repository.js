const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { MetaApoyo } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: MetaApoyo,
  entity: "meta_apoyo",
  primaryKeys: ["id_meta"],
});
