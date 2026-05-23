const { hasAttribute } = require("./hasAttribute");

function addAuditUpdateFields(Model, data = {}) {
  const nextData = { ...data };

  if (hasAttribute(Model, "fecha_actualizacion") && nextData.fecha_actualizacion === undefined) {
    nextData.fecha_actualizacion = new Date();
  }

  if (hasAttribute(Model, "version") && nextData.version !== undefined) {
    nextData.version = Number(nextData.version) + 1;
  }

  return nextData;
}

module.exports = { addAuditUpdateFields };
