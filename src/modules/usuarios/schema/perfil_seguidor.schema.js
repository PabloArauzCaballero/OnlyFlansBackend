const { z } = require("zod");
const {
  idBigIntSchema,
  requiredString,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const perfilSeguidorBaseSchema = z.object({
  id_usuario: idBigIntSchema,
  nombre_visible: requiredString(120),
});

const createPerfilSeguidorSchema = perfilSeguidorBaseSchema.merge(auditCreateOptionalSchema);

const updatePerfilSeguidorSchema = requireAtLeastOneField(
  perfilSeguidorBaseSchema.omit({ id_usuario: true }).partial().merge(auditUpdateOptionalSchema)
);

const perfilSeguidorIdParamSchema = z.object({
  id_usuario: idBigIntSchema,
});

const perfilSeguidorListQuerySchema = listQuerySchema.extend({
  nombre_visible: z.string().trim().optional(),
});

module.exports = {
  createSchema: createPerfilSeguidorSchema,
  updateSchema: updatePerfilSeguidorSchema,
  idSchema: perfilSeguidorIdParamSchema,
  querySchema: perfilSeguidorListQuerySchema,
  createPerfilSeguidorSchema,
  updatePerfilSeguidorSchema,
  perfilSeguidorIdParamSchema,
  perfilSeguidorListQuerySchema,
};
