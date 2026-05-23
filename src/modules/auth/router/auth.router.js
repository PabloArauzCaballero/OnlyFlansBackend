const router = require("express").Router();
const AuthController = require("../controller/auth.controller");
const rootLogger = require("../../../../logs/logger");
const { requireAuth } = require("../../../../middlewares/jwtMiddleware");

const logger = rootLogger.child({ module: "auth.router" });

const {
  validateBody,
} = require("../../../../middlewares/validate.middleware");

const {
  loginSchema,
  registrarCreadorSchema,
  registrarSeguidorSchema,
} = require("../schema/auth.schema");

router.post(
  "/registro/creador",
  validateBody(registrarCreadorSchema, logger, "auth_register_creator"),
  AuthController.registerCreator
);

router.post(
  "/registro/seguidor",
  validateBody(registrarSeguidorSchema, logger, "auth_register_follower"),
  AuthController.registerFollower
);

router.post(
  "/login",
  validateBody(loginSchema, logger, "auth_login"),
  AuthController.login
);

router.post(
  "/logout",
  requireAuth,
  AuthController.logout
);

router.get(
  "/me",
  requireAuth,
  AuthController.me
);

module.exports = router;
