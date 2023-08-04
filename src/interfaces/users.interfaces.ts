import { z } from "zod";
import {
  usersListSchema,
  userPayloadSchema,
  userBodySchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type TUserBody = z.infer<typeof userSchema>;
type TUserPayload = z.infer<typeof userPayloadSchema>;
type TUser = z.infer<typeof usersListSchema>;
type TUserUpdate = DeepPartial<typeof userUpdateSchema>;
type TUsersList = z.infer<typeof usersListSchema>;

export { TUserBody, TUserPayload, TUser, TUserUpdate, TUsersList };
