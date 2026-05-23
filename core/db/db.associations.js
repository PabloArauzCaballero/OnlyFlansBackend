const { sequelize } = require("./db.config");
const models = {};

models.Usuario = require("../../src/modules/usuarios/model/usuario.model")(sequelize);
models.PerfilCreador = require("../../src/modules/usuarios/model/perfil_creador.model")(sequelize);
models.PerfilSeguidor = require("../../src/modules/usuarios/model/perfil_seguidor.model")(sequelize);
models.CreadorFavorito = require("../../src/modules/usuarios/model/creador_favorito.model")(sequelize);
models.CreadorSeguido = require("../../src/modules/usuarios/model/creador_seguido.model")(sequelize);

models.SesionUsuario = require("../../src/modules/auth/model/sesion_usuario.model")(sequelize);
models.Logs = require("../../src/modules/auth/model/logs.model")(sequelize);

models.TipoApoyo = require("../../src/modules/apoyos/model/tipo_apoyo.model")(sequelize);
models.MetaApoyo = require("../../src/modules/apoyos/model/meta_apoyo.model")(sequelize);
models.Apoyo = require("../../src/modules/apoyos/model/apoyo.model")(sequelize);

models.Publicacion = require("../../src/modules/publicaciones/model/publicacion.model")(sequelize);
models.PublicacionImagen = require("../../src/modules/publicaciones/model/publicacion_imagen.model")(sequelize);
models.ComentarioPublicacion = require("../../src/modules/publicaciones/model/comentario_publicacion.model")(sequelize);

// USUARIO / AUTH
models.SesionUsuario.belongsTo(models.Usuario, { as: "usuario", foreignKey: "id_usuario", onDelete: "CASCADE" });
models.Usuario.hasMany(models.SesionUsuario, { as: "sesiones", foreignKey: "id_usuario", onDelete: "CASCADE" });

models.Logs.belongsTo(models.SesionUsuario, { as: "sesion", foreignKey: "id_sesion", onDelete: "SET NULL" });
models.SesionUsuario.hasMany(models.Logs, { as: "logs", foreignKey: "id_sesion", onDelete: "SET NULL" });

models.Logs.belongsTo(models.Usuario, { as: "usuario", foreignKey: "id_usuario", onDelete: "SET NULL" });
models.Usuario.hasMany(models.Logs, { as: "logs", foreignKey: "id_usuario", onDelete: "SET NULL" });

// PERFILES
models.PerfilCreador.belongsTo(models.Usuario, { as: "usuario", foreignKey: "id_usuario", onDelete: "CASCADE" });
models.Usuario.hasOne(models.PerfilCreador, { as: "perfilCreador", foreignKey: "id_usuario", onDelete: "CASCADE" });

models.PerfilSeguidor.belongsTo(models.Usuario, { as: "usuario", foreignKey: "id_usuario", onDelete: "CASCADE" });
models.Usuario.hasOne(models.PerfilSeguidor, { as: "perfilSeguidor", foreignKey: "id_usuario", onDelete: "CASCADE" });

// APOYOS
models.MetaApoyo.belongsTo(models.PerfilCreador, { as: "creador", foreignKey: "id_creador", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilCreador.hasMany(models.MetaApoyo, { as: "metasApoyo", foreignKey: "id_creador", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.Apoyo.belongsTo(models.PerfilSeguidor, { as: "seguidor", foreignKey: "id_seguidor", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilSeguidor.hasMany(models.Apoyo, { as: "apoyosRealizados", foreignKey: "id_seguidor", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.Apoyo.belongsTo(models.PerfilCreador, { as: "creador", foreignKey: "id_creador", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilCreador.hasMany(models.Apoyo, { as: "apoyosRecibidos", foreignKey: "id_creador", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.Apoyo.belongsTo(models.TipoApoyo, { as: "tipoApoyo", foreignKey: "id_tipo_apoyo", onDelete: "RESTRICT" });
models.TipoApoyo.hasMany(models.Apoyo, { as: "apoyos", foreignKey: "id_tipo_apoyo", onDelete: "RESTRICT" });

// PUBLICACIONES
models.Publicacion.belongsTo(models.PerfilCreador, { as: "creador", foreignKey: "id_creador", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilCreador.hasMany(models.Publicacion, { as: "publicaciones", foreignKey: "id_creador", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.PublicacionImagen.belongsTo(models.Publicacion, { as: "publicacion", foreignKey: "id_publicacion", onDelete: "CASCADE" });
models.Publicacion.hasMany(models.PublicacionImagen, { as: "imagenes", foreignKey: "id_publicacion", onDelete: "CASCADE" });

models.ComentarioPublicacion.belongsTo(models.Publicacion, { as: "publicacion", foreignKey: "id_publicacion", onDelete: "CASCADE" });
models.Publicacion.hasMany(models.ComentarioPublicacion, { as: "comentarios", foreignKey: "id_publicacion", onDelete: "CASCADE" });

models.ComentarioPublicacion.belongsTo(models.PerfilSeguidor, { as: "seguidor", foreignKey: "id_seguidor", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilSeguidor.hasMany(models.ComentarioPublicacion, { as: "comentarios", foreignKey: "id_seguidor", sourceKey: "id_usuario", onDelete: "CASCADE" });

// FAVORITOS
models.CreadorFavorito.belongsTo(models.PerfilSeguidor, { as: "seguidor", foreignKey: "id_seguidor", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilSeguidor.hasMany(models.CreadorFavorito, { as: "favoritos", foreignKey: "id_seguidor", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.CreadorFavorito.belongsTo(models.PerfilCreador, { as: "creador", foreignKey: "id_creador", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilCreador.hasMany(models.CreadorFavorito, { as: "marcadoComoFavoritoPor", foreignKey: "id_creador", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.PerfilSeguidor.belongsToMany(models.PerfilCreador, {
  through: models.CreadorFavorito,
  as: "creadoresFavoritos",
  foreignKey: "id_seguidor",
  otherKey: "id_creador",
});

models.PerfilCreador.belongsToMany(models.PerfilSeguidor, {
  through: models.CreadorFavorito,
  as: "seguidoresQueLoMarcaronFavorito",
  foreignKey: "id_creador",
  otherKey: "id_seguidor",
});

// SEGUIDOS
models.CreadorSeguido.belongsTo(models.PerfilSeguidor, { as: "seguidor", foreignKey: "id_seguidor", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilSeguidor.hasMany(models.CreadorSeguido, { as: "seguidos", foreignKey: "id_seguidor", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.CreadorSeguido.belongsTo(models.PerfilCreador, { as: "creador", foreignKey: "id_creador", targetKey: "id_usuario", onDelete: "CASCADE" });
models.PerfilCreador.hasMany(models.CreadorSeguido, { as: "seguidoPor", foreignKey: "id_creador", sourceKey: "id_usuario", onDelete: "CASCADE" });

models.PerfilSeguidor.belongsToMany(models.PerfilCreador, {
  through: models.CreadorSeguido,
  as: "creadoresSeguidos",
  foreignKey: "id_seguidor",
  otherKey: "id_creador",
});

models.PerfilCreador.belongsToMany(models.PerfilSeguidor, {
  through: models.CreadorSeguido,
  as: "seguidores",
  foreignKey: "id_creador",
  otherKey: "id_seguidor",
});

module.exports = models;
