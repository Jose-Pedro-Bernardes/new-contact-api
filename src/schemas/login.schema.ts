import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().max(125),
  password: z.string(),
});

export { loginSchema };
