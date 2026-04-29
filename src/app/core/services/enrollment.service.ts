import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { Enrollment } from "../models/courses/enrollment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseApiService {
  getMyEnrollments() {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/enrollments`);
  }
}
