const { hasAttribute } = require("./hasAttribute");

function addAuditCreateFields(Model, data = {}) {
  const nextData = { ...data };

  if (hasAttribute(Model, "fecha_registro") && nextData.fecha_registro === undefined) {
    nextData.fecha_registro = new Date();
  }

  if (hasAttribute(Model, "fecha_actualizacion") && nextData.fecha_actualizacion === undefined) {
    nextData.fecha_actualizacion = new Date();
  }

  if (hasAttribute(Model, "version") && nextData.version === undefined) {
    nextData.version = 1;
  }

  if (hasAttribute(Model, "estado_registro") && nextData.estado_registro === undefined) {
    nextData.estado_registro = "ACTIVO";
  }

  return nextData;
}

module.exports = { addAuditCreateFields };
