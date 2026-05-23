const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { PerfilCreador } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: PerfilCreador,
  entity: "perfil_creador",
  primaryKeys: ["id_usuario"],
});
