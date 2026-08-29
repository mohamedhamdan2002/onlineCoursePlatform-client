import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CoursePageList } from "../models/courses/course-page-list";
import { Course, CreateCourseRequest } from "../models/courses/course";
import { BaseApiService } from "./base-api.service";
import { CourseLevel } from "../stores/course.store";

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseApiService {

  getAllCourses(pageNumber:number = 1, pageSize:number = 10, categoriesIds: string | null = null, levels: string | null = null, priceRange: [number, number] | null = null, minRating: number | null = null, searchTerm: string | null = null, sortBy: string | null = null
  ) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("pageNumber", pageNumber);
    httpParams = httpParams.append("pageSize", pageSize);
    if(categoriesIds !== null && categoriesIds.length > 0){
      httpParams = httpParams.append("categoriesIds", categoriesIds)
    }
    if(levels !== null && levels.length > 0){
      httpParams = httpParams.append("levels", levels)
    }
    if(priceRange !== null){
      httpParams = httpParams.append("minPrice", priceRange[0]);
      httpParams = httpParams.append("maxPrice", priceRange[1]);
    }
    if(minRating !== null){
      httpParams = httpParams.append("minRating", minRating);
    }
    
    if(searchTerm !== null) {
      httpParams = httpParams.append("searchTerm", searchTerm);
    }
    if(sortBy !== null) {
      let sortColumn = "price";
      let sortDirection = "desc";
      switch (sortBy) {
        case 'popular':
          sortColumn = 'popular';
          break;
        case 'rating':
          sortColumn = 'rating';
          break;
        case 'price-low':
          sortDirection = 'asc';
          break;
      }
      httpParams = httpParams
                  .set('sortColumn', sortColumn)
                  .set('sortDirection', sortDirection);
    }
    return this.http.get<CoursePageList>(`${this.baseUrl}/courses`, {
      params: httpParams
    });
  }
  getCourseLevels() {
    return this.http.get<CourseLevel[]>(`${this.baseUrl}/courses/levels`);
  }


  getCourseById(courseId: string) {
    return this.http.get<Course>(`${this.baseUrl}/courses/${courseId}`);
  }

  createCourse(request: CreateCourseRequest) {
    const formData = new FormData();
    formData.append('title', request.title);
    formData.append('categoryId', request.categoryId);
    formData.append('description', request.description);
    formData.append('price', request.price.toString());
    formData.append('level', request.level.toString());
    if(request.image !== undefined)
      formData.append('image', request.image);
    return this.http.post<Course>(`${this.baseUrl}/courses/`, formData);
  }
}
