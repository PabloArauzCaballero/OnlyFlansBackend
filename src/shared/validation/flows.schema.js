const { z } = require("zod");
const {
  idBigIntSchema,
  requiredString,
  requiredText,
  optionalText,
  optionalNonEmptyText,
  optionalUrl,
  requiredUrlOrText,
  positiveIntSchema,
  decimalPositiveSchema,
  estadoPagoSchema,
  jsonValueSchema,
} = require("./common.schema");

/*
  Schemas de casos transaccionales recomendados.
  Estos NO representan una sola tabla; validan payloads de servicios que insertan más de un registro usando sequelize.transaction().
*/

const passwordSchema = z
  .string()
  .min(8, "La contraseña debe tener al menos 8 caracteres.")
  .max(100, "La contraseña es demasiado larga.");

const usuarioPublicoSchema = z.object({
  nombre: requiredString(120),
  email: z.string().trim().email("Debe ser un correo válido."),
  password: passwordSchema,
  url_imagen_portada: optionalUrl(),
  imagen_perfil: optionalUrl(),
});

const registrarCreadorSchema = z.object({
  usuario: usuarioPublicoSchema.extend({
    rol: z.literal("CREADOR").default("CREADOR"),
  }),
  perfil_creador: z.object({
    nombre_publico: requiredString(120),
    biografia: optionalText(),
    foto_perfil_url: optionalUrl(),
    banner_url: optionalUrl(),
  }),
});

const registrarSeguidorSchema = z.object({
  usuario: usuarioPublicoSchema.extend({
    rol: z.literal("SEGUIDOR").default("SEGUIDOR"),
  }),
  perfil_seguidor: z.object({
    nombre_visible: requiredString(120),
  }),
});

const loginSchema = z.object({
  email: z.string().trim().email("Debe ser un correo válido."),
  password: passwordSchema,
});

const iniciarSesionConLogSchema = z.object({
  id_usuario: idBigIntSchema,
  ip: z.string().trim().max(80).optional().nullable(),
  user_agent: optionalText(),
  log: z.object({
    accion: z.string().trim().default("LOGIN"),
    metadata: jsonValueSchema,
  }).optional(),
});

const cerrarSesionConLogSchema = z.object({
  id_sesion: idBigIntSchema,
  id_usuario: idBigIntSchema.optional().nullable(),
  log: z.object({
    accion: z.string().trim().default("LOGOUT"),
    metadata: jsonValueSchema,
  }).optional(),
});

const crearApoyoTransaccionalSchema = z.object({
  apoyo: z.object({
    id_seguidor: idBigIntSchema,
    id_creador: idBigIntSchema,
    id_tipo_apoyo: idBigIntSchema,
    cantidad: positiveIntSchema,
    monto_unitario_bs: decimalPositiveSchema,
    mensaje: optionalText(),
    estado_pago: estadoPagoSchema.default("SIMULADO_APROBADO"),
  }),
  crear_log: z.boolean().default(false),
  id_sesion: idBigIntSchema.optional().nullable(),
  id_usuario: idBigIntSchema.optional().nullable(),
});

const publicacionImagenInputSchema = z.object({
  link_imagen: requiredUrlOrText(),
  orden: positiveIntSchema.optional(),
});

const crearPublicacionConImagenesSchema = z.object({
  publicacion: z.object({
    id_creador: idBigIntSchema,
    texto: optionalNonEmptyText(),
  }),
  imagenes: z.array(publicacionImagenInputSchema).default([]),
}).superRefine((data, ctx) => {
  const tieneTexto = typeof data.publicacion.texto === "string" && data.publicacion.texto.trim().length > 0;
  const tieneImagenes = Array.isArray(data.imagenes) && data.imagenes.length > 0;

  if (!tieneTexto && !tieneImagenes) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La publicación debe tener texto o al menos una imagen.",
      path: ["publicacion", "texto"],
    });
  }
});

const crearPublicacionConMetaOpcionalSchema = crearPublicacionConImagenesSchema.extend({
  meta_apoyo: z.object({
    titulo: requiredString(160),
    descripcion: requiredText(),
  }).optional(),
});

module.exports = {
  registrarCreadorSchema,
  registrarSeguidorSchema,
  loginSchema,
  iniciarSesionConLogSchema,
  cerrarSesionConLogSchema,
  crearApoyoTransaccionalSchema,
  crearPublicacionConImagenesSchema,
  crearPublicacionConMetaOpcionalSchema,
};
