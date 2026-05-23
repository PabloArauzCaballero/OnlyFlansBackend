const sendServerInternalError = require("../utils/sendServerInternalError");
const rootLogger = require("../../../logs/logger");

const PROTECTED_SYSTEM_FIELDS = new Set([
  "fecha_registro",
  "fecha_actualizacion",
  "version",
  "version_registro",
  "created_at",
  "updated_at",
  "deleted_at",
  "monto_total_bs",
]);

function toPlain(value) {
  if (!value) return value;
  if (typeof value.get === "function") return value.get({ plain: true });
  if (typeof value.toJSON === "function") return value.toJSON();
  return value;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanObject(value = {}, options = {}) {
  if (!isPlainObject(value)) return {};

  const stripProtected = options.stripProtected !== false;

  return Object.entries(value).reduce((acc, [key, fieldValue]) => {
    if (fieldValue === undefined) return acc;
    if (stripProtected && PROTECTED_SYSTEM_FIELDS.has(key)) return acc;
    acc[key] = fieldValue;
    return acc;
  }, {});
}

function normalizeIdOrParams(idOrParams) {
  if (isPlainObject(idOrParams)) {
    return cleanObject(idOrParams, { stripProtected: false });
  }

  return idOrParams;
}

async function runHook(hook, args, fallbackData) {
  if (typeof hook !== "function") {
    return { success: true, data: fallbackData };
  }

  const result = await hook(args);

  if (!result) {
    return { success: true, data: fallbackData };
  }

  return result;
}

function internalErrorResult(message) {
  return {
    success: false,
    statusCode: 500,
    message,
  };
}

function notFoundResult(entityName) {
  return {
    success: false,
    statusCode: 404,
    message: `No se encontró el registro de ${entityName}.`,
  };
}

function databaseErrorResult(error) {
  const name = error?.name || "";
  const message = error?.message || "";

  if (name === "SequelizeUniqueConstraintError") {
    return {
      success: false,
      statusCode: 409,
      message: "Ya existe un registro con valores únicos repetidos.",
      errors: error.errors?.map((item) => ({
        field: item.path,
        message: item.message,
        value: item.value,
      })) || null,
    };
  }

  if (name === "SequelizeForeignKeyConstraintError") {
    return {
      success: false,
      statusCode: 409,
      message: "No se pudo completar la operación porque una referencia relacionada no existe o está siendo usada.",
      errors: {
        table: error.table || null,
        fields: error.fields || null,
        constraint: error.index || error.constraint || null,
      },
    };
  }

  if (name === "SequelizeValidationError" || name === "SequelizeDatabaseError") {
    const isCheckConstraint = message.includes("violates check constraint");
    const isNotNull = message.includes("not-null") || message.includes("null value in column");

    if (isCheckConstraint || isNotNull || name === "SequelizeValidationError") {
      return {
        success: false,
        statusCode: 400,
        message: "La base de datos rechazó la operación por una restricción de integridad.",
        errors: {
          name,
          databaseMessage: message,
        },
      };
    }
  }

  return null;
}

function createCrudService({
  Repository,
  entityName,
  serviceName,
  hooks = {},
}) {
  if (!Repository) {
    throw new Error("createCrudService requiere un Repository válido.");
  }

  if (!entityName) {
    throw new Error("createCrudService requiere entityName.");
  }

  const logger = rootLogger.child({ module: serviceName || `${entityName}.service` });

  async function create(payload) {
    const startedAt = Date.now();
    const eventName = `${entityName}_create`;
    const moduleName = `${serviceName || entityName}.create`;

    try {
      let cleanPayload = cleanObject(payload);

      const hookResult = await runHook(hooks.beforeCreate, {
        payload: cleanPayload,
        Repository,
        entityName,
      }, cleanPayload);

      if (!hookResult.success) {
        return hookResult;
      }

      cleanPayload = hookResult.data || cleanPayload;

      const result = await Repository.create(cleanPayload);
      const plainResult = toPlain(result);

      const afterHook = await runHook(hooks.afterCreate, {
        payload: cleanPayload,
        result: plainResult,
        Repository,
        entityName,
      }, plainResult);

      if (!afterHook.success) {
        return afterHook;
      }

      return {
        success: true,
        message: "Registro creado correctamente.",
        data: afterHook.data || plainResult,
      };
    } catch (error) {
      const handledError = databaseErrorResult(error);

      if (handledError) {
        logger.warn({ event: eventName, error: handledError }, "Operación rechazada por la base de datos");
        return handledError;
      }

      sendServerInternalError(null, logger, eventName, startedAt, moduleName, error);
      return internalErrorResult("Error interno en el servicio al crear el registro.");
    }
  }

  async function update(idOrParams, payload) {
    const startedAt = Date.now();
    const eventName = `${entityName}_update`;
    const moduleName = `${serviceName || entityName}.update`;

    try {
      const normalizedId = normalizeIdOrParams(idOrParams);
      let cleanPayload = cleanObject(payload);

      const currentRecord = await Repository.get(normalizedId);

      if (!currentRecord) {
        return notFoundResult(entityName);
      }

      const hookResult = await runHook(hooks.beforeUpdate, {
        idOrParams: normalizedId,
        payload: cleanPayload,
        currentRecord: toPlain(currentRecord),
        Repository,
        entityName,
      }, cleanPayload);

      if (!hookResult.success) {
        return hookResult;
      }

      cleanPayload = hookResult.data || cleanPayload;

      const result = await Repository.update(normalizedId, cleanPayload);

      if (!result) {
        return notFoundResult(entityName);
      }

      const plainResult = toPlain(result);

      const afterHook = await runHook(hooks.afterUpdate, {
        idOrParams: normalizedId,
        payload: cleanPayload,
        previousRecord: toPlain(currentRecord),
        result: plainResult,
        Repository,
        entityName,
      }, plainResult);

      if (!afterHook.success) {
        return afterHook;
      }

      return {
        success: true,
        message: "Registro actualizado correctamente.",
        data: afterHook.data || plainResult,
      };
    } catch (error) {
      const handledError = databaseErrorResult(error);

      if (handledError) {
        logger.warn({ event: eventName, error: handledError }, "Operación rechazada por la base de datos");
        return handledError;
      }

      sendServerInternalError(null, logger, eventName, startedAt, moduleName, error);
      return internalErrorResult("Error interno en el servicio al actualizar el registro.");
    }
  }

  async function get(idOrParams) {
    const startedAt = Date.now();
    const eventName = `${entityName}_get`;
    const moduleName = `${serviceName || entityName}.get`;

    try {
      const normalizedId = normalizeIdOrParams(idOrParams);

      const hookResult = await runHook(hooks.beforeGet, {
        idOrParams: normalizedId,
        Repository,
        entityName,
      }, normalizedId);

      if (!hookResult.success) {
        return hookResult;
      }

      const finalId = hookResult.data || normalizedId;
      const result = await Repository.get(finalId);

      if (!result) {
        return notFoundResult(entityName);
      }

      return {
        success: true,
        message: "Registro obtenido correctamente.",
        data: toPlain(result),
      };
    } catch (error) {
      sendServerInternalError(null, logger, eventName, startedAt, moduleName, error);
      return internalErrorResult("Error interno en el servicio al obtener el registro.");
    }
  }

  async function list(query = {}) {
    const startedAt = Date.now();
    const eventName = `${entityName}_list`;
    const moduleName = `${serviceName || entityName}.list`;

    try {
      const cleanQuery = cleanObject(query, { stripProtected: false });

      const hookResult = await runHook(hooks.beforeList, {
        query: cleanQuery,
        Repository,
        entityName,
      }, cleanQuery);

      if (!hookResult.success) {
        return hookResult;
      }

      const finalQuery = hookResult.data || cleanQuery;
      const result = await Repository.list(finalQuery);
      const plainResult = toPlain(result);

      return {
        success: true,
        message: "Registros listados correctamente.",
        data: plainResult,
        pagination: plainResult && typeof plainResult === "object"
          ? {
              count: plainResult.count ?? null,
              limit: plainResult.limit ?? null,
              offset: plainResult.offset ?? null,
            }
          : null,
      };
    } catch (error) {
      sendServerInternalError(null, logger, eventName, startedAt, moduleName, error);
      return internalErrorResult("Error interno en el servicio al listar registros.");
    }
  }

  return {
    create,
    update,
    get,
    list,
  };
}

module.exports = createCrudService;
