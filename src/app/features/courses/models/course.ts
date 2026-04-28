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

  duration: string;     // e.g. "36 hours"
  level: string;        // e.g. "All Levels"

  price: number;
  category: Category;
  sections: Section[];
}
