const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { Usuario } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: Usuario,
  entity: "usuario",
  primaryKeys: ["id_usuario"],
});
