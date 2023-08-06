import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../handleErrors";
import {
  TContactBody,
  TContactPayload,
} from "../../interfaces/contacts.interfaces";
import { contactBodySchema } from "../../schemas/contacts.schemas";

const updateContactService = async (
  data: TContactPayload,
  contactId: string
): Promise<TContactBody> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const oldData = await contactRepository.findOneBy({ id: contactId });

  if (!oldData) throw new AppError("Contact not found", 404);

  const newContactData = contactRepository.create({
    ...oldData,
    ...data,
  });

  await contactRepository.save(newContactData);
  return contactBodySchema.parse(newContactData);
};

export { updateContactService };
