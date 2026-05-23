const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { CreadorFavorito } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: CreadorFavorito,
  entity: "creador_favorito",
  primaryKeys: ["id_favorito"],
});
