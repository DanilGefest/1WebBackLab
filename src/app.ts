import express from 'express';
import userRouter from './routes/UserRoutes';
import { errorHandler } from './services/middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/users', userRouter, errorHandler);

export default app;
