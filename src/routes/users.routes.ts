import { Router } from "express";
import {
  deleteUserController,
  listUsersController,
  registerUserController,
  userUpdateController,
} from "../controllers/users.controllers";
import { tokenIsValidMiddleware } from "../middlewares/token_&_id/EnsureTokenIsValid.middleware";
import { phoneNumberExistMiddleware } from "../middlewares/payloadValidations/EnsurePhoneNumberExists.middleware";
import { emailExistMiddleware } from "../middlewares/payloadValidations/EnsureEmailExists.middleware";
import { payloadIsValidMiddleware } from "../middlewares/payloadValidations/EnsurePayloadIsValid.middleware";
import { userIdIsValidMiddleware } from "../middlewares/adminValidations/EnsureIdIsValid.middleware";
import { userPayloadSchema, userUpdateSchema } from "../schemas/users.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  payloadIsValidMiddleware(userPayloadSchema),
  phoneNumberExistMiddleware,
  emailExistMiddleware,
  registerUserController
);
usersRoutes.get("", tokenIsValidMiddleware, listUsersController);
usersRoutes.patch(
  "",
  tokenIsValidMiddleware,
  payloadIsValidMiddleware(userUpdateSchema),
  userIdIsValidMiddleware,
  userUpdateController
);
usersRoutes.delete(
  "",
  tokenIsValidMiddleware,
  userIdIsValidMiddleware,
  deleteUserController
);

export { usersRoutes };
