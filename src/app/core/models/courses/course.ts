import { Section } from "./section";

export interface Category {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;

  imageUrl: string;

  rating: number;
  reviewsCount: number;
  studentsCount: number;
  isEnrolled: boolean;
  duration: string;     // e.g. "36 hours"
  level: string;        // e.g. "All Levels"

  price: number;
  category: Category;
  sections: Section[];
}

export interface CreateCourseRequest {
  title: string;
  image: File | undefined;
  level: number;
  price: number;
  categoryId: string;
  description: string;
}

