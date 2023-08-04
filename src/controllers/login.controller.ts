import { Request, Response } from "express";
import { createSessionService } from "../services/users/login.service";
import { TLoginRequest } from "../interfaces/login.interface";

const createSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLoginRequest = req.body;

  const token = await createSessionService(loginData);

  return res.json(token);
};

export { createSessionController };
