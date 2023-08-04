import { Request, Response } from "express";
import {
  TUserPayload,
  TUser,
  TUserUpdate,
} from "../interfaces/users.interfaces";
import { registerUserService } from "../services/users/registerUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { userUpdateService } from "../services/users/userUpdate.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { AppError } from "../handleErrors";

const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserPayload = req.body;
  const newUser: TUser = await registerUserService(userData);
  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersList = await listUsersService(req, res);
  return res.json(usersList);
};

const userUpdateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  const userData: TUserUpdate = req.body;
  const updatedUser = await userUpdateService(userId, userData);
  return res.json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req.params.id;
  await deleteUserService(userId);
  return res.status(204).send();
};

export {
  registerUserController,
  listUsersController,
  userUpdateController,
  deleteUserController,
};
