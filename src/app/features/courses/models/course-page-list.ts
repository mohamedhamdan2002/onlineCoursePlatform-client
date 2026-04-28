import { Course } from "./course";

export interface CoursePageList {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  pageItems: Course[]
}
