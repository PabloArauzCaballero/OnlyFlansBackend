const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const ComentarioPublicacion = sequelize.define("ComentarioPublicacion", {
    id_comentario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_comentario"
    },
    id_publicacion: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "publicacion", schema: "onlyflans" }, key: "id_publicacion" },
      field: "id_publicacion"
    },
    id_seguidor: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: { tableName: "perfil_seguidor", schema: "onlyflans" }, key: "id_usuario" },
      field: "id_seguidor"
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "comentario"
    },
    fecha_comentario: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("now()"),
      field: "fecha_comentario"
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
    tableName: "comentario_publicacion",
    freezeTableName: true,
    timestamps: false
  });

  return ComentarioPublicacion;
};
