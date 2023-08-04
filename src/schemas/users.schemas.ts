import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  full_name: z.string().max(45),
  email: z.string().max(125).email(),
  phone_number: z.string().max(11),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
});

const userPayloadSchema = userSchema.omit({
  id: true,
  createdAt: true,
});

const userBodySchema = userSchema.omit({
  password: true,
});

const userUpdateSchema = userPayloadSchema
  .omit({ id: true, admin: true, createdAt: true })
  .partial();

const usersListSchema = z.array(userBodySchema);

export {
  userSchema,
  userPayloadSchema,
  userBodySchema,
  userUpdateSchema,
  usersListSchema,
};
