const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const CreadorFavorito = sequelize.define("CreadorFavorito", {
    id_favorito: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_favorito"
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
    fecha_favorito: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_favorito"
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
    tableName: "creador_favorito",
    freezeTableName: true,
    timestamps: false
  });

  return CreadorFavorito;
};
