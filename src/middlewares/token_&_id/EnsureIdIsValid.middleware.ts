import { NextFunction, Request, Response } from "express";
import { AppError } from "../../handleErrors";

const userIdIsEqualMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: string = req.params.id;
  const userId: string = res.locals.id;

  if (id !== userId) {
    throw new AppError("You do not have sufficient permission.", 403);
  }

  return next();
};

export { userIdIsEqualMiddleware };
