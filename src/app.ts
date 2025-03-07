import express, { Request, Response } from "express";
import userRouter from "./routes/UserRoutes";

const app = express();

app.use(express.json()); 

app.get("/", (req: Request, res: Response) => {
  res.send("Привет!");
});

app.use("/api/users", userRouter)

export default app; 