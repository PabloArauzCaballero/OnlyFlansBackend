const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Logs = sequelize.define("Logs", {
    id_log: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_log"
    },
    id_sesion: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: { tableName: "sesion_usuario", schema: "onlyflans" }, key: "id_sesion" },
      field: "id_sesion"
    },
    accion: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "accion"
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "metadata"
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
    },
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: { tableName: "usuario", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_usuario"
    }
  }, {
    schema: "onlyflans",
    tableName: "logs",
    freezeTableName: true,
    timestamps: false
  });

  return Logs;
};
