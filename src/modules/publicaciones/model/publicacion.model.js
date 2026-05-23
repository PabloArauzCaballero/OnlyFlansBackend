const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Publicacion = sequelize.define("Publicacion", {
    id_publicacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_publicacion"
    },
    id_creador: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "perfil_creador", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_creador"
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "texto"
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_publicacion"
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
    tableName: "publicacion",
    freezeTableName: true,
    timestamps: false
  });

  return Publicacion;
};
