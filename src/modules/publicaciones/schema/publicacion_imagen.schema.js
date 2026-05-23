const { z } = require("zod");
const {
  idBigIntSchema,
  requiredUrlOrText,
  positiveIntSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const publicacionImagenBaseSchema = z.object({
  id_publicacion: idBigIntSchema,
  link_imagen: requiredUrlOrText(),
  orden: positiveIntSchema.optional(),
});

const createPublicacionImagenSchema = publicacionImagenBaseSchema.merge(auditCreateOptionalSchema);

const updatePublicacionImagenSchema = requireAtLeastOneField(
  publicacionImagenBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const publicacionImagenIdParamSchema = z.object({
  id_publicacion_imagen: idBigIntSchema,
});

const publicacionImagenListQuerySchema = listQuerySchema.extend({
  id_publicacion: idBigIntSchema.optional(),
  orden: positiveIntSchema.optional(),
});

module.exports = {
  createSchema: createPublicacionImagenSchema,
  updateSchema: updatePublicacionImagenSchema,
  idSchema: publicacionImagenIdParamSchema,
  querySchema: publicacionImagenListQuerySchema,
  createPublicacionImagenSchema,
  updatePublicacionImagenSchema,
  publicacionImagenIdParamSchema,
  publicacionImagenListQuerySchema,
};
