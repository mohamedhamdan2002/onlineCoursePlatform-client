import { Course } from "./course";

export interface Enrollment {
  id: string;
  course: Course;
  enrolledAt: Date;
  status: string;
  progressPercentage: number;
  continueLectureId: string;
}
export interface Progress {
  enrollmentId: string;
  status: string;
  progressPercentage: number;
  continueLectureId: string;
}
