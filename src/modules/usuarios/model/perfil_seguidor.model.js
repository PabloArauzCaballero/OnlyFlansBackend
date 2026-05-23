const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const PerfilSeguidor = sequelize.define("PerfilSeguidor", {
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: { model: { tableName: "usuario", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_usuario"
    },
    nombre_visible: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "nombre_visible"
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
    tableName: "perfil_seguidor",
    freezeTableName: true,
    timestamps: false
  });

  return PerfilSeguidor;
};
