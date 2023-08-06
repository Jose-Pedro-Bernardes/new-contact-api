import { z } from "zod";
import {
  contactsListSchema,
  contactPayloadSchema,
  contactBodySchema,
  contactSchema,
  contactUpdateSchema,
} from "../schemas/contacts.schemas";
import { DeepPartial } from "typeorm";

type TContactBody = z.infer<typeof contactBodySchema>;
type TContact = z.infer<typeof contactSchema>;
type TContactPayload = z.infer<typeof contactPayloadSchema>;
type TContactUpdate = DeepPartial<typeof contactUpdateSchema>;
type TContactsList = z.infer<typeof contactsListSchema>;

export {
  TContactBody,
  TContactPayload,
  TContact,
  TContactUpdate,
  TContactsList,
};
