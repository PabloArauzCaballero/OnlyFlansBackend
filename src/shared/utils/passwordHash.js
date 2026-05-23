const crypto = require("crypto");
const safeCompare = require("./safeCompare");
const sha2 = require("../../../core/sha2/sha2");

const ALGORITHM = "pbkdf2_sha256";
const ITERATIONS = 310000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(String(password), salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");

  return `${ALGORITHM}$${ITERATIONS}$${salt}$${hash}`;
}

function verifyPbkdf2(password, storedHash) {
  const [, iterationsRaw, salt, expectedHash] = String(storedHash).split("$");
  const iterations = Number(iterationsRaw);

  if (!iterations || !salt || !expectedHash) {
    return false;
  }

  const calculatedHash = crypto
    .pbkdf2Sync(String(password), salt, iterations, KEY_LENGTH, DIGEST)
    .toString("hex");

  return safeCompare(calculatedHash, expectedHash);
}

function verifyLegacySha256(password, storedHash) {
  if (!/^[a-f0-9]{64}$/i.test(String(storedHash || ""))) {
    return false;
  }

  return safeCompare(sha2.sha2Encode(String(password)), storedHash);
}

function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;

  if (String(storedHash).startsWith(`${ALGORITHM}$`)) {
    return verifyPbkdf2(password, storedHash);
  }

  // Compatibilidad con usuarios creados previamente con SHA-256 simple.
  if (verifyLegacySha256(password, storedHash)) {
    return true;
  }

  return false;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
