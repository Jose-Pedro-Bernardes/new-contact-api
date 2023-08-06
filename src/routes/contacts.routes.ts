import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  listAllClientsController,
  updateContactController,
} from "../controllers/contacts.controllers";
import { tokenIsValidMiddleware } from "../middlewares/token_&_id/EnsureTokenIsValid.middleware";

const contactRoutes = Router();

contactRoutes.post("", tokenIsValidMiddleware, createContactController);
contactRoutes.get("", tokenIsValidMiddleware, listAllClientsController);
contactRoutes.patch("/:id", tokenIsValidMiddleware, updateContactController);
contactRoutes.delete("/:id", tokenIsValidMiddleware, deleteContactController);

export { contactRoutes };
