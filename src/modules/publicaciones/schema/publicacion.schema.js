const { z } = require("zod");
const {
  idBigIntSchema,
  optionalNonEmptyText,
  requiredUrlOrText,
  positiveIntSchema,
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

const publicacionImagenInputSchema = z.object({
  link_imagen: requiredUrlOrText(),
  orden: positiveIntSchema.optional(),
});

const createPublicacionSchema = publicacionBaseSchema.merge(auditCreateOptionalSchema);

const createPublicacionWithImagesSchema = publicacionBaseSchema
  .extend({
    imagenes: z
      .array(publicacionImagenInputSchema)
      .min(1, "Debe enviar al menos una imagen para usar este endpoint."),
  })
  .merge(auditCreateOptionalSchema)
  .superRefine((data, ctx) => {
    const usedOrders = new Set();

    data.imagenes.forEach((imagen, index) => {
      if (imagen.orden === undefined) return;

      if (usedOrders.has(imagen.orden)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El orden de las imágenes no puede repetirse.",
          path: ["imagenes", index, "orden"],
        });
      }

      usedOrders.add(imagen.orden);
    });
  });

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
  createWithImagesSchema: createPublicacionWithImagesSchema,
  updateSchema: updatePublicacionSchema,
  idSchema: publicacionIdParamSchema,
  querySchema: publicacionListQuerySchema,
  createPublicacionSchema,
  createPublicacionWithImagesSchema,
  updatePublicacionSchema,
  publicacionIdParamSchema,
  publicacionListQuerySchema,
};
