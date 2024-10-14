import express from "express";
import authRouter from "./auth/router";

const baseRouter = express.Router();

baseRouter.use("/v1/auth", authRouter);

export default baseRouter;
