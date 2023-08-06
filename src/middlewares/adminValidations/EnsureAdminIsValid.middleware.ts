import { NextFunction, Request, Response } from "express";
import { AppError } from "../../handleErrors";

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const { admin, tokenId } = res.locals.token;

  if (!admin && tokenId !== id) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

const justIsAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const admin = res.locals.token.admin;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { isAdminMiddleware, justIsAdminMiddleware };
