const { Op } = require("sequelize");
const { hasAttribute } = require("../utils/hasAttribute");

const CONTROL_QUERY_FIELDS = new Set([
  "page",
  "limit",
  "offset",
  "search",
  "orderBy",
  "orderDir",
]);

function toPlain(value) {
  if (!value) return value;
  if (typeof value.get === "function") return value.get({ plain: true });
  if (typeof value.toJSON === "function") return value.toJSON();
  return value;
}

function getSingleId(idOrParams, primaryKey) {
  if (idOrParams && typeof idOrParams === "object") {
    return idOrParams[primaryKey];
  }

  return idOrParams;
}

function buildWhereFromId(idOrParams, primaryKeys) {
  if (primaryKeys.length === 1) {
    return {
      [primaryKeys[0]]: getSingleId(idOrParams, primaryKeys[0]),
    };
  }

  return primaryKeys.reduce((where, primaryKey) => {
    where[primaryKey] = idOrParams?.[primaryKey];
    return where;
  }, {});
}

function hasMissingPrimaryKey(where) {
  return Object.values(where).some(
    (value) => value === undefined || value === null || value === ""
  );
}

function normalizeBooleanValue(value) {
  if (value === true || value === false) return value;
  if (value === "true" || value === "1" || value === 1) return true;
  if (value === "false" || value === "0" || value === 0) return false;
  return value;
}

function normalizeWhereValue(attribute, value) {
  if (attribute?.type?.key === "BOOLEAN") {
    return normalizeBooleanValue(value);
  }

  return value;
}

function buildSearchWhere(Model, search) {
  if (!search || typeof search !== "string" || !search.trim()) {
    return null;
  }

  const searchableFields = Object.entries(Model.rawAttributes || {})
    .filter(([, attribute]) => {
      const typeKey = attribute?.type?.key;
      return ["STRING", "TEXT", "CITEXT"].includes(typeKey);
    })
    .map(([field]) => field);

  if (searchableFields.length === 0) {
    return null;
  }

  return {
    [Op.or]: searchableFields.map((field) => ({
      [field]: { [Op.iLike]: `%${search.trim()}%` },
    })),
  };
}

function buildWhereFromQuery(Model, query = {}) {
  const filters = Object.entries(query).reduce((where, [key, value]) => {
    if (CONTROL_QUERY_FIELDS.has(key)) return where;
    if (value === undefined || value === null || value === "") return where;
    if (!hasAttribute(Model, key)) return where;

    where[key] = normalizeWhereValue(Model.rawAttributes[key], value);
    return where;
  }, {});

  const searchWhere = buildSearchWhere(Model, query.search);

  if (!searchWhere) {
    return filters;
  }

  return {
    [Op.and]: [filters, searchWhere],
  };
}

function getOrder(Model, primaryKeys, query = {}) {
  const defaultOrderBy = primaryKeys[0];
  const requestedOrderBy = query.orderBy;
  const orderBy = hasAttribute(Model, requestedOrderBy)
    ? requestedOrderBy
    : defaultOrderBy;

  const requestedOrderDir = String(query.orderDir || "DESC").toUpperCase();
  const orderDir = requestedOrderDir === "ASC" ? "ASC" : "DESC";

  return [[orderBy, orderDir]];
}

function normalizePagination(query = {}) {
  const limit = Math.min(Number(query.limit || 20), 100);
  const offset = Number(query.offset || 0);

  return {
    limit: Number.isFinite(limit) && limit > 0 ? limit : 20,
    offset: Number.isFinite(offset) && offset >= 0 ? offset : 0,
  };
}

function addUpdateTimestamps(Model, payload = {}) {
  const nextPayload = { ...payload };

  if (hasAttribute(Model, "fecha_actualizacion") && nextPayload.fecha_actualizacion === undefined) {
    nextPayload.fecha_actualizacion = new Date();
  }

  return nextPayload;
}

function createCrudRepository({ Model, entity, primaryKeys }) {
  if (!Model) {
    throw new Error("createCrudRepository requiere un modelo Sequelize válido.");
  }

  if (!entity) {
    throw new Error("createCrudRepository requiere el nombre de entidad.");
  }

  if (!Array.isArray(primaryKeys) || primaryKeys.length === 0) {
    throw new Error("createCrudRepository requiere al menos una primary key.");
  }

  async function create(payload) {
    const result = await Model.create({ ...payload });
    return toPlain(result);
  }

  async function get(idOrParams) {
    const where = buildWhereFromId(idOrParams, primaryKeys);

    if (hasMissingPrimaryKey(where)) {
      return null;
    }

    const result = primaryKeys.length === 1
      ? await Model.findByPk(where[primaryKeys[0]])
      : await Model.findOne({ where });

    return toPlain(result);
  }

  async function list(query = {}) {
    const { limit, offset } = normalizePagination(query);
    const where = buildWhereFromQuery(Model, query);

    const result = await Model.findAndCountAll({
      where,
      limit,
      offset,
      order: getOrder(Model, primaryKeys, query),
    });

    return {
      count: result.count,
      rows: result.rows.map((row) => toPlain(row)),
      limit,
      offset,
    };
  }

  async function update(idOrParams, payload) {
    const where = buildWhereFromId(idOrParams, primaryKeys);

    if (hasMissingPrimaryKey(where)) {
      return null;
    }

    const updatePayload = addUpdateTimestamps(Model, payload);

    const [affectedRows, rows] = await Model.update(updatePayload, {
      where,
      returning: true,
    });

    if (affectedRows === 0) {
      return null;
    }

    const updatedRow = rows?.[0];

    if (updatedRow) {
      return toPlain(updatedRow);
    }

    return get(where);
  }

  return {
    create,
    get,
    list,
    update,
  };
}

module.exports = createCrudRepository;
