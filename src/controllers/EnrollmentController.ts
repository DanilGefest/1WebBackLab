import { Request, Response, NextFunction } from 'express';
import Enrollment from '../models/Enrollment';
import Lesson from '../models/Lesson';

export const createEnrollment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body.id) {
			res.status(401).json({ message: 'Пользовтель не найден.' });
			return;
		}

		const { course, lessons } = req.body;

		if (lessons.length === 0) {
			res.status(401).json({ message: 'Список уроков пуст.' });
			return;
		}

		const enrollment = new Enrollment({
			user: req.body.id,
			course,
			lessons,
		});
		await enrollment.save();

		res.status(201).json({ message: 'Запись создана', enrollment });
	} catch (error) {
		next(error);
	}
};

export const completeLesson = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { enrollementId, lessonId } = req.params;

		const enrollment = await Enrollment.findById(enrollementId);
		const lesson = await Lesson.findById(lessonId);

		if (!enrollment) {
			res.status(404).json({ message: 'Запись не найдена.' });
			return;
		}

		if (!lesson) {
			res.status(404).json({ message: 'Урок не найден.' });
			return;
		}

		if (!lesson) {
			res.status(404).json({
				message: 'Урок не найден.',
			});
			return;
		}

		if (lesson.course.toString() != enrollment.course.toString()) {
			res.status(401).json({
				message: 'урок не соответствует записанному курсу.',
			});
			return;
		}

		if (
			!enrollment.lessons.includes(lesson.id) ||
			enrollment.completedLessons.includes(lesson.id)
		) {
			res.status(401).json({
				message: 'урока нет в курсе или он уже выполнен.',
			});
			return;
		}

		enrollment.completedLessons.push(lesson.id);
		await enrollment.save();

		enrollment.progress = enrollment.completedLessons.length / enrollment.lessons.length;
		await enrollment.save();

		res.status(200).json({ message: 'Урок выполрнен', enrollment });
	} catch (error) {
		next(error);
	}
};

export const uncompleteLesson = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { enrollementId, lessonId } = req.params;

		const enrollment = await Enrollment.findById(enrollementId);
		const lesson = await Lesson.findById(lessonId);

		if (!enrollment) {
			res.status(404).json({ message: 'Запись не найдена.' });
			return;
		}

		if (!lesson) {
			res.status(404).json({ message: 'Урок не найден.' });
			return;
		}

		if (!enrollment.completedLessons.includes(lesson.id)) {
			res.status(401).json({
				message: 'Урок не выполнен.',
			});
			return;
		}

		enrollment.completedLessons.splice(lesson.id, 1);
		await enrollment.save();

		enrollment.progress = enrollment.completedLessons.length / enrollment.lessons.length;
		await enrollment.save();

		res.status(200).json({ message: 'Урок отменен', enrollment });
	} catch (error) {
		next(error);
	}
};

export const enrollmentProgress = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { enrollementId } = req.params;

		const enrollment = await Enrollment.findById(enrollementId);

		if (!enrollment) {
			res.status(404).json({
				message: 'Запись не найдена',
			});
			return;
		}

		res.status(200).json({ progress: enrollment.progress });
	} catch (error) {
		next(error);
	}
};

export const enrollmentUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { courseId } = req.params;

		const users = await Enrollment.find({ course: courseId }, 'user').populate('user');

		res.status(200).json({ users });
	} catch (error) {
		next(error);
	}
};
