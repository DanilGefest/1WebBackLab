import express from 'express';
import userRouter from './routes/UserRouter';
import { errorHandler } from './middlewares/errorHandler';
import courseRouter from './routes/CourseRouter';
import tagRouter from './routes/TagRouter';

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/tags', tagRouter);
app.use(errorHandler);

export default app;
