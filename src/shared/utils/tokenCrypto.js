const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";

function getKey() {
  const key = process.env.TOKEN_ENCRYPTION_KEY;

  if (!key) {
    throw new Error("TOKEN_ENCRYPTION_KEY no está configurado.");
  }

  const buffer = Buffer.from(key, "hex");

  if (buffer.length !== 32) {
    throw new Error("TOKEN_ENCRYPTION_KEY debe tener 32 bytes en formato hex.");
  }

  return buffer;
}


function encryptText(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}


function decryptText(payload) {
  const [ivHex, authTagHex, encryptedHex] = payload.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

module.exports = {
  encryptText,
  decryptText,
};

