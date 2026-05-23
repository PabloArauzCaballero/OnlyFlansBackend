const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { CreadorSeguido } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: CreadorSeguido,
  entity: "creador_seguido",
  primaryKeys: ["id_seguimiento"],
});
