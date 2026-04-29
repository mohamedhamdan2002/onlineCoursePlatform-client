import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Category } from "../models/courses/course";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseApiService {
  getAllCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

}
