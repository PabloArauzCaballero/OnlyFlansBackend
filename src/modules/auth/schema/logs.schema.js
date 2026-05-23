const { z } = require("zod");
const {
  idBigIntSchema,
  optionalText,
  jsonValueSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const logsBaseSchema = z.object({
  id_sesion: idBigIntSchema.optional().nullable(),
  id_usuario: idBigIntSchema.optional().nullable(),
  accion: optionalText(),
  metadata: jsonValueSchema,
});

const createLogsSchema = logsBaseSchema.merge(auditCreateOptionalSchema);

const updateLogsSchema = requireAtLeastOneField(
  logsBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const logsIdParamSchema = z.object({
  id_log: idBigIntSchema,
});

const logsListQuerySchema = listQuerySchema.extend({
  id_sesion: idBigIntSchema.optional(),
  id_usuario: idBigIntSchema.optional(),
  accion: z.string().trim().optional(),
});

module.exports = {
  createSchema: createLogsSchema,
  updateSchema: updateLogsSchema,
  idSchema: logsIdParamSchema,
  querySchema: logsListQuerySchema,
  createLogsSchema,
  updateLogsSchema,
  logsIdParamSchema,
  logsListQuerySchema,
};
