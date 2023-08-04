import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express from "express";
import { handleErrors } from "./handleErrors";
import { usersRoutes } from "./routes/users.routes";
import { loginRoute } from "./routes/login.routes";

const app = express();
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/contacts");
app.use("/api/login", loginRoute);
app.use("/api/admin");

app.use(handleErrors);

export { app };
