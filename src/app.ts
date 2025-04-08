import express, { Request, Response } from "express";
import userRouter from "./routes/UserRoutes";
import { errorHandler } from "./services/middlewares/errorHandler";

const app = express();

app.use(express.json()); 

app.get("/", (req: Request, res: Response) => {
  res.send("Привет!");
});

app.use("/api/users", userRouter, errorHandler)

export default app; 