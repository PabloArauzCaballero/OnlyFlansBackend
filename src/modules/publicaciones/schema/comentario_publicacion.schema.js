const { z } = require("zod");
const {
  idBigIntSchema,
  requiredText,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const comentarioPublicacionBaseSchema = z.object({
  id_publicacion: idBigIntSchema,
  id_seguidor: idBigIntSchema,
  comentario: requiredText(),
  fecha_comentario: dateTimeSchema.optional(),
});

const createComentarioPublicacionSchema = comentarioPublicacionBaseSchema.merge(auditCreateOptionalSchema);

const updateComentarioPublicacionSchema = requireAtLeastOneField(
  comentarioPublicacionBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const comentarioPublicacionIdParamSchema = z.object({
  id_comentario: idBigIntSchema,
});

const comentarioPublicacionListQuerySchema = listQuerySchema.extend({
  id_publicacion: idBigIntSchema.optional(),
  id_seguidor: idBigIntSchema.optional(),
});

module.exports = {
  createSchema: createComentarioPublicacionSchema,
  updateSchema: updateComentarioPublicacionSchema,
  idSchema: comentarioPublicacionIdParamSchema,
  querySchema: comentarioPublicacionListQuerySchema,
  createComentarioPublicacionSchema,
  updateComentarioPublicacionSchema,
  comentarioPublicacionIdParamSchema,
  comentarioPublicacionListQuerySchema,
};
