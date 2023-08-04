import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../handleErrors";

const phoneNumberExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      phone_number: payload.phone_number,
    },
  });

  if (user?.phone_number === payload.phone_number) {
    throw new AppError("Phone number already exists", 409);
  }

  return next();
};

export { phoneNumberExistMiddleware };
