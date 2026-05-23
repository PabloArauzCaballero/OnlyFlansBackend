const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { SesionUsuario } = require("../../../../core/db/db.associations");
const toPlain = require("../../../shared/utils/toPlain");

const baseRepository = createCrudRepository({
  Model: SesionUsuario,
  entity: "sesion_usuario",
  primaryKeys: ["id_sesion"],
});

async function closeSession({ id_sesion, id_usuario }) {
  const where = { id_sesion };

  if (id_usuario) {
    where.id_usuario = id_usuario;
  }

  const [affectedRows, rows] = await SesionUsuario.update(
    {
      fecha_cierre: new Date(),
      fecha_actualizacion: new Date(),
      estado_registro: "INACTIVO",
    },
    {
      where,
      returning: true,
    }
  );

  if (affectedRows === 0) {
    return null;
  }

  return toPlain(rows?.[0]) || baseRepository.get({ id_sesion });
}

module.exports = {
  ...baseRepository,
  closeSession,
};
