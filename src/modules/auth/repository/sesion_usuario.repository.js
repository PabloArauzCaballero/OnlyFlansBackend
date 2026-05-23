const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { SesionUsuario } = require("../../../../core/db/db.associations");

module.exports = createCrudRepository({
  Model: SesionUsuario,
  entity: "sesion_usuario",
  primaryKeys: ["id_sesion"],
});
