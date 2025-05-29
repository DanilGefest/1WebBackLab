import { Schema, model } from 'mongoose';

interface IEnrollment {
	_id: string;
	user: Schema.Types.ObjectId;
	course: Schema.Types.ObjectId;
	lessons: Schema.Types.ObjectId[];
	completedLessons: Schema.Types.ObjectId[];
	progress: number;
}

const EnrollmentSchema: Schema = new Schema<IEnrollment>({
	user: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
	course: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	lessons: [{ type: Schema.Types.ObjectId, required: true, default: [], ref: 'Lessons' }],
	completedLessons: [
		{ type: Schema.Types.ObjectId, required: true, default: [], ref: 'Lessons' },
	],
	progress: { type: Number, required: true, default: 0 },
});

const Enrollment = model<IEnrollment>('Enrollments', EnrollmentSchema);

export default Enrollment;
export { IEnrollment };
