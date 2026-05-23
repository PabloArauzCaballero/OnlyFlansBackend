const { z } = require("zod");
const {
  idBigIntSchema,
  requiredString,
  requiredText,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const metaApoyoBaseSchema = z.object({
  id_creador: idBigIntSchema,
  titulo: requiredString(160),
  descripcion: requiredText(),
});

const createMetaApoyoSchema = metaApoyoBaseSchema.merge(auditCreateOptionalSchema);

const updateMetaApoyoSchema = requireAtLeastOneField(
  metaApoyoBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const metaApoyoIdParamSchema = z.object({
  id_meta: idBigIntSchema,
});

const metaApoyoListQuerySchema = listQuerySchema.extend({
  id_creador: idBigIntSchema.optional(),
  titulo: z.string().trim().optional(),
});

module.exports = {
  createSchema: createMetaApoyoSchema,
  updateSchema: updateMetaApoyoSchema,
  idSchema: metaApoyoIdParamSchema,
  querySchema: metaApoyoListQuerySchema,
  createMetaApoyoSchema,
  updateMetaApoyoSchema,
  metaApoyoIdParamSchema,
  metaApoyoListQuerySchema,
};
