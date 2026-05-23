const { z } = require("zod");
const {
  idBigIntSchema,
  requiredString,
  optionalText,
  optionalUrl,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const perfilCreadorBaseSchema = z.object({
  id_usuario: idBigIntSchema,
  nombre_publico: requiredString(120),
  biografia: optionalText(),
  foto_perfil_url: optionalUrl(),
  banner_url: optionalUrl(),
});

const createPerfilCreadorSchema = perfilCreadorBaseSchema.merge(auditCreateOptionalSchema);

const updatePerfilCreadorSchema = requireAtLeastOneField(
  perfilCreadorBaseSchema.omit({ id_usuario: true }).partial().merge(auditUpdateOptionalSchema)
);

const perfilCreadorIdParamSchema = z.object({
  id_usuario: idBigIntSchema,
});

const perfilCreadorListQuerySchema = listQuerySchema.extend({
  nombre_publico: z.string().trim().optional(),
});

module.exports = {
  createSchema: createPerfilCreadorSchema,
  updateSchema: updatePerfilCreadorSchema,
  idSchema: perfilCreadorIdParamSchema,
  querySchema: perfilCreadorListQuerySchema,
  createPerfilCreadorSchema,
  updatePerfilCreadorSchema,
  perfilCreadorIdParamSchema,
  perfilCreadorListQuerySchema,
};
