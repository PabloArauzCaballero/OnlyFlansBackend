const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { Publicacion } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: Publicacion,
  entity: "publicacion",
  primaryKeys: ["id_publicacion"],
});
