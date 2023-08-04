import { Router } from "express";
import { payloadIsValidMiddleware } from "../middlewares/payloadValidations/EnsurePayloadIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";
import { createSessionController } from "../controllers/login.controller";

const loginRoute: Router = Router();

loginRoute.post(
  "",
  payloadIsValidMiddleware(loginSchema),
  createSessionController
);

export { loginRoute };
