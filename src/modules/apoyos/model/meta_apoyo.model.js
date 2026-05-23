const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const MetaApoyo = sequelize.define("MetaApoyo", {
    id_meta: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_meta"
    },
    id_creador: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "perfil_creador", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_creador"
    },
    titulo: {
      type: DataTypes.STRING(160),
      allowNull: false,
      field: "titulo"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "descripcion"
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
    tableName: "meta_apoyo",
    freezeTableName: true,
    timestamps: false
  });

  return MetaApoyo;
};
