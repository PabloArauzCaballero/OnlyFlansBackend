const { z } = require("zod");
const {
  idBigIntSchema,
  positiveIntSchema,
  decimalPositiveSchema,
  optionalText,
  estadoPagoSchema,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const apoyoBaseSchema = z.object({
  id_seguidor: idBigIntSchema,
  id_creador: idBigIntSchema,
  id_tipo_apoyo: idBigIntSchema,
  cantidad: positiveIntSchema,
  monto_unitario_bs: decimalPositiveSchema,
  mensaje: optionalText(),
  estado_pago: estadoPagoSchema.optional(),
  fecha_apoyo: dateTimeSchema.optional(),
});

const createApoyoSchema = apoyoBaseSchema.merge(auditCreateOptionalSchema);

const updateApoyoSchema = requireAtLeastOneField(
  apoyoBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

// monto_total_bs es una columna generada por PostgreSQL.
// No debe recibirse en create/update, porque la base la calcula como cantidad * monto_unitario_bs.

const apoyoIdParamSchema = z.object({
  id_apoyo: idBigIntSchema,
});

const apoyoListQuerySchema = listQuerySchema.extend({
  id_seguidor: idBigIntSchema.optional(),
  id_creador: idBigIntSchema.optional(),
  id_tipo_apoyo: idBigIntSchema.optional(),
  estado_pago: estadoPagoSchema.optional(),
});

module.exports = {
  createSchema: createApoyoSchema,
  updateSchema: updateApoyoSchema,
  idSchema: apoyoIdParamSchema,
  querySchema: apoyoListQuerySchema,
  createApoyoSchema,
  updateApoyoSchema,
  apoyoIdParamSchema,
  apoyoListQuerySchema,
};
