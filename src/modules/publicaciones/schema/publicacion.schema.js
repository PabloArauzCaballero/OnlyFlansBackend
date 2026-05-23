const { z } = require("zod");
const {
  idBigIntSchema,
  optionalNonEmptyText,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const publicacionBaseSchema = z.object({
  id_creador: idBigIntSchema,
  texto: optionalNonEmptyText(),
  fecha_publicacion: dateTimeSchema.optional(),
});

const createPublicacionSchema = publicacionBaseSchema.merge(auditCreateOptionalSchema);

const updatePublicacionSchema = requireAtLeastOneField(
  publicacionBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const publicacionIdParamSchema = z.object({
  id_publicacion: idBigIntSchema,
});

const publicacionListQuerySchema = listQuerySchema.extend({
  id_creador: idBigIntSchema.optional(),
});

module.exports = {
  createSchema: createPublicacionSchema,
  updateSchema: updatePublicacionSchema,
  idSchema: publicacionIdParamSchema,
  querySchema: publicacionListQuerySchema,
  createPublicacionSchema,
  updatePublicacionSchema,
  publicacionIdParamSchema,
  publicacionListQuerySchema,
};
