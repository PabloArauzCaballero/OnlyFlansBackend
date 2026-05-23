const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Usuario = sequelize.define("Usuario", {
    id_usuario: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_usuario"
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
      field: "nombre"
    },
    email: {
      type: DataTypes.CITEXT,
      allowNull: false,
      field: "email"
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "password_hash"
    },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "rol"
    },
    ultimo_login: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "ultimo_login"
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
    url_imagen_portada: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "url_imagen_portada"
    },
    imagen_perfil: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "imagen_perfil"
    }
  }, {
    schema: "onlyflans",
    tableName: "usuario",
    freezeTableName: true,
    timestamps: false
  });

  return Usuario;
};
