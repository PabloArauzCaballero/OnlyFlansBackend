const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { PerfilSeguidor } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: PerfilSeguidor,
  entity: "perfil_seguidor",
  primaryKeys: ["id_usuario"],
});
