const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { PublicacionImagen } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: PublicacionImagen,
  entity: "publicacion_imagen",
  primaryKeys: ["id_publicacion_imagen"],
});
