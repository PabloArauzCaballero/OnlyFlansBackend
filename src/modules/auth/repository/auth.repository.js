const { sequelize } = require("../../../../core/db/db.config");
const {
  Usuario,
  PerfilCreador,
  PerfilSeguidor,
} = require("../../../../core/db/db.associations");
const toPlain = require("../../../shared/utils/toPlain");

function removeSensitiveUserFields(user) {
  const plainUser = toPlain(user);
  if (!plainUser) return null;

  delete plainUser.password_hash;
  return plainUser;
}

async function findActiveUserByEmail(email) {
  const user = await Usuario.findOne({
    where: {
      email,
      estado_registro: "ACTIVO",
    },
  });

  return toPlain(user);
}

async function findActiveUserById(idUsuario) {
  const user = await Usuario.findOne({
    where: {
      id_usuario: idUsuario,
      estado_registro: "ACTIVO",
    },
    include: [
      {
        model: PerfilCreador,
        as: "perfilCreador",
        required: false,
      },
      {
        model: PerfilSeguidor,
        as: "perfilSeguidor",
        required: false,
      },
    ],
  });

  return removeSensitiveUserFields(user);
}

async function updateLastLogin(idUsuario) {
  await Usuario.update(
    {
      ultimo_login: new Date(),
      fecha_actualizacion: new Date(),
    },
    {
      where: { id_usuario: idUsuario },
    }
  );
}

async function createCreatorAccount({ usuario, perfil_creador }) {
  return sequelize.transaction(async (transaction) => {
    const createdUser = await Usuario.create(usuario, { transaction });
    const plainUser = toPlain(createdUser);

    const createdProfile = await PerfilCreador.create(
      {
        ...perfil_creador,
        id_usuario: plainUser.id_usuario,
      },
      { transaction }
    );

    return {
      usuario: removeSensitiveUserFields(plainUser),
      perfil_creador: toPlain(createdProfile),
    };
  });
}

async function createFollowerAccount({ usuario, perfil_seguidor }) {
  return sequelize.transaction(async (transaction) => {
    const createdUser = await Usuario.create(usuario, { transaction });
    const plainUser = toPlain(createdUser);

    const createdProfile = await PerfilSeguidor.create(
      {
        ...perfil_seguidor,
        id_usuario: plainUser.id_usuario,
      },
      { transaction }
    );

    return {
      usuario: removeSensitiveUserFields(plainUser),
      perfil_seguidor: toPlain(createdProfile),
    };
  });
}

module.exports = {
  findActiveUserByEmail,
  findActiveUserById,
  updateLastLogin,
  createCreatorAccount,
  createFollowerAccount,
};
