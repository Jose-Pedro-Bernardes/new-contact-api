import { Repository } from "typeorm";
import { Contact, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../handleErrors";

const listAllContactsService = async (userId: string): Promise<Contact[]> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) throw new AppError("Client not found", 404);

  const contacts = await contactRepository.find({
    where: {
      user: { id: userId },
    },
  });

  return contacts;
};

export { listAllContactsService };
