import { Request, Response } from "express";
import { TUsersList } from "../../interfaces/users.interfaces";
import { Repository } from "typeorm";
import { User } from "../../entities/index";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../handleErrors";
import { usersListSchema } from "../../schemas/users.schemas";

const listUsersService = async (
  req: Request,
  res: Response
): Promise<TUsersList> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const isAdmin = res.locals.token.admin;

  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const users: User[] | undefined = await userRepository.find();
  const usersResponse: TUsersList = usersListSchema.parse(users);

  return usersResponse;
};

export { listUsersService };
