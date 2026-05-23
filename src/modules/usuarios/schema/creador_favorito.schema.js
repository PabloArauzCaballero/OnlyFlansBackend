const { z } = require("zod");
const {
  idBigIntSchema,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const creadorFavoritoBaseSchema = z.object({
  id_seguidor: idBigIntSchema,
  id_creador: idBigIntSchema,
  fecha_favorito: dateTimeSchema.optional(),
});

const createCreadorFavoritoSchema = creadorFavoritoBaseSchema
  .merge(auditCreateOptionalSchema)
  .refine((data) => data.id_seguidor !== data.id_creador, {
    message: "Un usuario no debería marcarse como favorito a sí mismo.",
    path: ["id_creador"],
  });

const updateCreadorFavoritoSchema = requireAtLeastOneField(
  creadorFavoritoBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const creadorFavoritoIdParamSchema = z.object({
  id_favorito: idBigIntSchema,
});

const creadorFavoritoListQuerySchema = listQuerySchema.extend({
  id_seguidor: idBigIntSchema.optional(),
  id_creador: idBigIntSchema.optional(),
});

module.exports = {
  createSchema: createCreadorFavoritoSchema,
  updateSchema: updateCreadorFavoritoSchema,
  idSchema: creadorFavoritoIdParamSchema,
  querySchema: creadorFavoritoListQuerySchema,
  createCreadorFavoritoSchema,
  updateCreadorFavoritoSchema,
  creadorFavoritoIdParamSchema,
  creadorFavoritoListQuerySchema,
};
