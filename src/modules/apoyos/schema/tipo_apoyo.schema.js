const { z } = require("zod");
const {
  idBigIntSchema,
  requiredString,
  optionalText,
  decimalPositiveSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const tipoApoyoBaseSchema = z.object({
  codigo: requiredString(40).transform((value) => value.toUpperCase()),
  nombre: requiredString(100),
  descripcion: optionalText(),
  monto_unitario_bs: decimalPositiveSchema,
});

const createTipoApoyoSchema = tipoApoyoBaseSchema.merge(auditCreateOptionalSchema);

const updateTipoApoyoSchema = requireAtLeastOneField(
  tipoApoyoBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const tipoApoyoIdParamSchema = z.object({
  id_tipo_apoyo: idBigIntSchema,
});

const tipoApoyoListQuerySchema = listQuerySchema.extend({
  codigo: z.string().trim().optional(),
  nombre: z.string().trim().optional(),
});

module.exports = {
  createSchema: createTipoApoyoSchema,
  updateSchema: updateTipoApoyoSchema,
  idSchema: tipoApoyoIdParamSchema,
  querySchema: tipoApoyoListQuerySchema,
  createTipoApoyoSchema,
  updateTipoApoyoSchema,
  tipoApoyoIdParamSchema,
  tipoApoyoListQuerySchema,
};
