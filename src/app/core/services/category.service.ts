import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Category } from "../models/courses/course";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5050/api'
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

}
