const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const SesionUsuario = sequelize.define("SesionUsuario", {
    id_sesion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_sesion"
    },
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "usuario", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_usuario"
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_inicio"
    },
    fecha_cierre: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "fecha_cierre"
    },
    ip: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: "ip"
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "user_agent"
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
    tableName: "sesion_usuario",
    freezeTableName: true,
    timestamps: false
  });

  return SesionUsuario;
};
