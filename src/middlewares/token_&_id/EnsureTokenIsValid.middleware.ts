import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../handleErrors";

const tokenIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "invalid token" });

  const splitToken = token.split(" ")[1];

  jwt.verify(splitToken, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) throw new AppError("Invalid Token", 401);
    res.locals.id = decoded.sub;

    return next();
  });
};

export { tokenIsValidMiddleware };
