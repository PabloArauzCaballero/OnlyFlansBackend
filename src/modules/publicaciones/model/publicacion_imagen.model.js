const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const PublicacionImagen = sequelize.define("PublicacionImagen", {
    id_publicacion_imagen: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_publicacion_imagen"
    },
    id_publicacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "publicacion", schema: "onlyflans" }, key: "id_publicacion" },
      field: "id_publicacion"
    },
    link_imagen: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "link_imagen"
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: "orden"
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_registro"
    },
    fecha_actualizacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_actualizacion"
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: "version"
    },
    estado_registro: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "ACTIVO",
      field: "estado_registro"
    }
  }, {
    schema: "onlyflans",
    tableName: "publicacion_imagen",
    freezeTableName: true,
    timestamps: false
  });

  return PublicacionImagen;
};
