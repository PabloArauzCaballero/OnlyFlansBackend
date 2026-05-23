const { z } = require("zod");
const {
  idBigIntSchema,
  optionalString,
  optionalText,
  dateTimeSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
} = require("../../../shared/validation/common.schema");

const sesionUsuarioBaseSchema = z.object({
  id_usuario: idBigIntSchema,
  fecha_inicio: dateTimeSchema.optional(),
  fecha_cierre: dateTimeSchema.optional().nullable(),
  ip: optionalString(80),
  user_agent: optionalText(),
});

const createSesionUsuarioSchema = sesionUsuarioBaseSchema.merge(auditCreateOptionalSchema);

const updateSesionUsuarioSchema = requireAtLeastOneField(
  sesionUsuarioBaseSchema.partial().merge(auditUpdateOptionalSchema)
);

const sesionUsuarioIdParamSchema = z.object({
  id_sesion: idBigIntSchema,
});

const sesionUsuarioListQuerySchema = listQuerySchema.extend({
  id_usuario: idBigIntSchema.optional(),
  abiertas: z.coerce.boolean().optional(),
});

module.exports = {
  createSchema: createSesionUsuarioSchema,
  updateSchema: updateSesionUsuarioSchema,
  idSchema: sesionUsuarioIdParamSchema,
  querySchema: sesionUsuarioListQuerySchema,
  createSesionUsuarioSchema,
  updateSesionUsuarioSchema,
  sesionUsuarioIdParamSchema,
  sesionUsuarioListQuerySchema,
};
