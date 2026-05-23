const { z } = require("zod");
const {
  idBigIntSchema,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const creadorSeguidoBaseSchema = z.object({
  id_seguidor: idBigIntSchema,
  id_creador: idBigIntSchema,
  fecha_seguimiento: dateTimeSchema.optional(),
});

const createCreadorSeguidoSchema = creadorSeguidoBaseSchema
  .merge(auditCreateOptionalSchema)
  .refine((data) => data.id_seguidor !== data.id_creador, {
    message: "Un usuario no debería seguirse a sí mismo.",
    path: ["id_creador"],
  });

const updateCreadorSeguidoSchema = requireAtLeastOneField(
  creadorSeguidoBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const creadorSeguidoIdParamSchema = z.object({
  id_seguimiento: idBigIntSchema,
});

const creadorSeguidoListQuerySchema = listQuerySchema.extend({
  id_seguidor: idBigIntSchema.optional(),
  id_creador: idBigIntSchema.optional(),
});

module.exports = {
  createSchema: createCreadorSeguidoSchema,
  updateSchema: updateCreadorSeguidoSchema,
  idSchema: creadorSeguidoIdParamSchema,
  querySchema: creadorSeguidoListQuerySchema,
  createCreadorSeguidoSchema,
  updateCreadorSeguidoSchema,
  creadorSeguidoIdParamSchema,
  creadorSeguidoListQuerySchema,
};
