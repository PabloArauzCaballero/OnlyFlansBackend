const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const TipoApoyo = sequelize.define("TipoApoyo", {
    id_tipo_apoyo: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_tipo_apoyo"
    },
    codigo: {
      type: DataTypes.STRING(40),
      allowNull: false,
      field: "codigo"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nombre"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "descripcion"
    },
    monto_unitario_bs: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      field: "monto_unitario_bs"
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
    tableName: "tipo_apoyo",
    freezeTableName: true,
    timestamps: false
  });

  return TipoApoyo;
};
