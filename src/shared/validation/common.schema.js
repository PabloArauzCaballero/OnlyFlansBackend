const { z } = require("zod");

const estadoRegistroSchema = z.enum(["ACTIVO", "INACTIVO", "ELIMINADO"]);
const rolUsuarioSchema = z.enum(["CREADOR", "SEGUIDOR"]);
const estadoPagoSchema = z.enum(["PENDIENTE", "SIMULADO_APROBADO", "ANULADO"]);

const idBigIntSchema = z.coerce.number().int().positive();
const positiveIntSchema = z.coerce.number().int().positive();
const positiveVersionSchema = z.coerce.number().int().positive();

const requiredString = (max = 255) =>
  z.string().trim().min(1, "Este campo es obligatorio.").max(max);

const optionalString = (max = 255) =>
  z.string().trim().max(max).optional().nullable();

const requiredText = () =>
  z.string().trim().min(1, "Este campo es obligatorio.");

const optionalText = () =>
  z.string().trim().optional().nullable();

const optionalNonEmptyText = () =>
  z.string().trim().min(1, "Si envía este campo, no puede estar vacío.").optional().nullable();

const requiredUrlOrText = () =>
  z.string().trim().min(1, "Este campo es obligatorio.");

const optionalUrl = () =>
  z.string().trim().url("Debe ser una URL válida.").optional().nullable();

const dateTimeSchema = z.coerce.date();

const decimalPositiveSchema = z
  .union([
    z.number().finite().positive(),
    z.string().trim().regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número decimal válido.")
  ])
  .transform((value) => String(value))
  .refine((value) => Number(value) > 0, "Debe ser mayor a 0.");

// Para columnas JSONB. El body HTTP ya llega como JSON, por eso se acepta cualquier valor JSON serializable.
const jsonValueSchema = z.unknown().optional().nullable();

const auditCreateOptionalSchema = z.object({
  fecha_registro: dateTimeSchema.optional(),
  fecha_actualizacion: dateTimeSchema.optional(),
  version: positiveVersionSchema.optional(),
  estado_registro: estadoRegistroSchema.optional(),
});

const auditUpdateOptionalSchema = z.object({
  fecha_actualizacion: dateTimeSchema.optional(),
  version: positiveVersionSchema.optional(),
  estado_registro: estadoRegistroSchema.optional(),
});

const listQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().trim().optional(),
  orderBy: z.string().trim().optional(),
  orderDir: z.enum(["ASC", "DESC", "asc", "desc"]).optional(),
  estado_registro: estadoRegistroSchema.optional(),
});

const requireAtLeastOneField = (schema) =>
  schema.refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar.",
  });

module.exports = {
  estadoRegistroSchema,
  rolUsuarioSchema,
  estadoPagoSchema,
  idBigIntSchema,
  positiveIntSchema,
  positiveVersionSchema,
  requiredString,
  optionalString,
  requiredText,
  optionalText,
  optionalNonEmptyText,
  requiredUrlOrText,
  optionalUrl,
  dateTimeSchema,
  decimalPositiveSchema,
  jsonValueSchema,
  auditCreateOptionalSchema,
  auditUpdateOptionalSchema,
  listQuerySchema,
  requireAtLeastOneField,
};
