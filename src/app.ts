import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express from "express";
import { handleErrors } from "./handleErrors";

const app = express();
app.use(express.json());

app.use("/users");
app.use("/login");

app.use(handleErrors);

export { app };
