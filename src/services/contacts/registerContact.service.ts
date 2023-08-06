import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User, Contact } from "../../entities/index";
import { AppError } from "../../handleErrors";
import {
  contactBodySchema,
  contactSchema,
} from "../../schemas/contacts.schemas";
import {
  TContactBody,
  TContactPayload,
  TContactsList,
} from "../../interfaces/contacts.interfaces";

const registerContactService = async (
  payload: TContactPayload,
  userId: string
): Promise<TContactBody> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) throw new AppError("User not found!", 404);
  const contact = contactRepository.create({
    ...payload,
    user,
  });

  await contactRepository.save(contact);
  return contactBodySchema.parse(contact);
};

export { registerContactService };
