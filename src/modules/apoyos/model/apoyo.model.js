const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Apoyo = sequelize.define("Apoyo", {
    id_apoyo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_apoyo"
    },
    id_seguidor: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "perfil_seguidor", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_seguidor"
    },
    id_creador: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "perfil_creador", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_creador"
    },
    id_tipo_apoyo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "tipo_apoyo", schema: "onlyflans" }, key: "id_tipo_apoyo" },
      field: "id_tipo_apoyo"
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cantidad"
    },
    monto_unitario_bs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      field: "monto_unitario_bs"
    },
    monto_total_bs: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: true,
      field: "monto_total_bs"
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "mensaje"
    },
    estado_pago: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "SIMULADO_APROBADO",
      field: "estado_pago"
    },
    fecha_apoyo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_apoyo"
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
    tableName: "apoyo",
    freezeTableName: true,
    timestamps: false
  });

  return Apoyo;
};
