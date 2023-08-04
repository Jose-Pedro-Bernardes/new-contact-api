import { Repository } from "typeorm";
import { TUserPayload, TUser } from "../../interfaces/users.interfaces";
import { User } from "../../entities/index";
import { AppDataSource } from "../../data-source";
import { userBodySchema } from "../../schemas/users.schemas";

const registerUserService = async (userData: TUserPayload): Promise<TUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const userResponse: TUser | any = userBodySchema.parse(user);
  return userResponse;
};

export { registerUserService };
