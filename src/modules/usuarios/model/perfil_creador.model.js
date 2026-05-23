const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const PerfilCreador = sequelize.define("PerfilCreador", {
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: { model: { tableName: "usuario", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_usuario"
    },
    nombre_publico: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "nombre_publico"
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "biografia"
    },
    foto_perfil_url: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "foto_perfil_url"
    },
    banner_url: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "banner_url"
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
    tableName: "perfil_creador",
    freezeTableName: true,
    timestamps: false
  });

  return PerfilCreador;
};
