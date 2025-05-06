import express from 'express';
import userRouter from './routes/UserRouter';
import { errorHandler } from './middlewares/errorHandler';
import courseRouter from './routes/CourseRouter';
import tagRouter from './routes/TagRouter';
import lessonRouter from './routes/LessonRouter';
import commentRouter from './routes/CommentRoutes';

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/tags', tagRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/comments', commentRouter);
app.use(errorHandler);

export default app;
