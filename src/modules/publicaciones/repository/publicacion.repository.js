const createCrudRepository = require("../../../shared/repository/createCrudRepository");
const { sequelize } = require("../../../../core/db/db.config");
const { Publicacion, PublicacionImagen } = require("../../../../core/db/db.associations");

function toPlain(value) {
  if (!value) return value;
  if (typeof value.get === "function") return value.get({ plain: true });
  if (typeof value.toJSON === "function") return value.toJSON();
  return value;
}

function removeUndefinedFields(payload = {}) {
  return Object.entries(payload).reduce((acc, [key, value]) => {
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}

const baseRepository = createCrudRepository({
  Model: Publicacion,
  entity: "publicacion",
  primaryKeys: ["id_publicacion"],
});

async function createWithImages({ publicacion, imagenes }) {
  return sequelize.transaction(async (transaction) => {
    const createdPublicacion = await Publicacion.create(removeUndefinedFields(publicacion), { transaction });
    const plainPublicacion = toPlain(createdPublicacion);

    const imagesPayload = imagenes.map((imagen, index) => removeUndefinedFields({
      id_publicacion: plainPublicacion.id_publicacion,
      link_imagen: imagen.link_imagen,
      orden: imagen.orden ?? index + 1,
      estado_registro: imagen.estado_registro,
    }));

    const createdImages = await PublicacionImagen.bulkCreate(imagesPayload, {
      transaction,
      returning: true,
    });

    return {
      ...plainPublicacion,
      imagenes: createdImages.map((image) => toPlain(image)),
    };
  });
}

module.exports = {
  ...baseRepository,
  createWithImages,
};
