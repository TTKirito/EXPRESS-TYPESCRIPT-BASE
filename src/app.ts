import express from "express";
import { configRouter } from "./configs/route";
import { currentUser } from "./utils/Exception";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(currentUser)

configRouter(app);

export default app;
