import { TLoginRequest } from "../../interfaces/login.interface";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../handleErrors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const createSessionService = async (
  loginData: TLoginRequest
): Promise<object> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await findUserByEmail(
    loginData.email,
    userRepository
  );
  await checkUserCredentials(loginData.password, user);
  const token = generateToken(user);

  return { token };
};

const findUserByEmail = async (
  email: string,
  userRepository: Repository<User>
): Promise<User> => {
  const user: User | null = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

const checkUserCredentials = async (
  password: string,
  user: User
): Promise<void> => {
  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }
};

const generateToken = (user: User): string => {
  const token = sign(
    {
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      subject: String(user.id),
      expiresIn: "1d",
    }
  );

  return token;
};

export { createSessionService };
