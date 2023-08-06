import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const contactBodySchema = z.object({
  id: z.string(),
  full_name: z.string().max(45),
  email: z.string().max(125).email(),
  phone_number: z.string().max(11),
  createdAt: z.string(),
});

const contactSchema = contactBodySchema.omit({
  id: true,
});

const contactSchemaResponse = z.array(contactBodySchema);

const contactPayloadSchema = contactSchema.omit({
  id: true,
  createdAt: true,
});

const contactSchemaa = z.object({
  name: z.string(),
  email: z.string().email(),
  number: z.string().regex(phoneRegex, "Invalid Number!").nullish(),
  createdAt: z.string(),
});

const contactUpdateSchema = contactSchema
  .omit({ id: true, admin: true, createdAt: true })
  .partial();

const contactsListSchema = z.array(contactBodySchema);

export {
  contactSchema,
  contactSchemaa,
  contactPayloadSchema,
  contactBodySchema,
  contactUpdateSchema,
  contactsListSchema,
  contactSchemaResponse,
};
