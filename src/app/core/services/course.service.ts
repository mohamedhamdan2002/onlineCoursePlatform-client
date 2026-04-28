import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CoursePageList } from "../../features/courses/models/course-page-list";
import { Course } from "../../features/courses/models/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5050/api'

  getAllCourses(pageNumber:number = 1, pageSize:number = 10, categoriesIds: string | null = null) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("pageNumber", pageNumber);
    httpParams = httpParams.append("pageSize", pageSize);
    if(categoriesIds !== null && categoriesIds.length > 0){
      httpParams = httpParams.append("categoriesIds", categoriesIds)
    }
    return this.http.get<CoursePageList>(`${this.baseUrl}/courses`, {
      params: httpParams
    });
  }

  getCourseById(courseId: string) {
    return this.http.get<Course>(`${this.baseUrl}/courses/${courseId}`);
  }
}
