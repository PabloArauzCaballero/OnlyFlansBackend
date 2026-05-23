const { z } = require("zod");
const {
  rolUsuarioSchema,
  idBigIntSchema,
  requiredString,
  optionalUrl,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const usuarioBaseSchema = z.object({
  nombre: requiredString(120),
  email: z.string().trim().email("Debe ser un correo válido."),
  password_hash: requiredString(255),
  rol: rolUsuarioSchema,
  ultimo_login: dateTimeSchema.optional().nullable(),
  url_imagen_portada: optionalUrl(),
  imagen_perfil: optionalUrl(),
});

const createUsuarioSchema = usuarioBaseSchema.merge(auditCreateOptionalSchema);

const updateUsuarioSchema = requireAtLeastOneField(
  usuarioBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const usuarioIdParamSchema = z.object({
  id_usuario: idBigIntSchema,
});

const usuarioListQuerySchema = listQuerySchema.extend({
  rol: rolUsuarioSchema.optional(),
  email: z.string().trim().optional(),
  nombre: z.string().trim().optional(),
});

module.exports = {
  createSchema: createUsuarioSchema,
  updateSchema: updateUsuarioSchema,
  idSchema: usuarioIdParamSchema,
  querySchema: usuarioListQuerySchema,
  createUsuarioSchema,
  updateUsuarioSchema,
  usuarioIdParamSchema,
  usuarioListQuerySchema,
};
