import { Repository } from "typeorm";
import { TUser, TUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userBodySchema } from "../../schemas/users.schemas";

const userUpdateService = async (
  userId: string,
  userData: TUserUpdate
): Promise<TUser> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const currentUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newUserData: User = userRepository.create({
    ...currentUserData,
    ...userData,
  });

  await userRepository.save(newUserData);
  const userResponse: TUser | any = userBodySchema.parse(newUserData);

  return userResponse;
};

export { userUpdateService };
