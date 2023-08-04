import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const deleteUserService = async (userId: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | any = await userRepository.findOneBy({
    id: userId,
  });
  await userRepository.remove(user!);
};

export { deleteUserService };
