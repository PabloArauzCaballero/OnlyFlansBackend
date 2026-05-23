const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { ComentarioPublicacion } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: ComentarioPublicacion,
  entity: "comentario_publicacion",
  primaryKeys: ["id_comentario"],
});
