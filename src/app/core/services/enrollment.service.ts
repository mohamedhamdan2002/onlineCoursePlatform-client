import { Injectable } from "@angular/core";
import { BaseApiService } from "./base-api.service";
import { Enrollment, Progress } from "../models/courses/enrollment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseApiService {
  endPoint = `${this.baseUrl}/enrollments`;
  getMyEnrollments() {
    return this.http.get<Enrollment[]>(this.endPoint);
  }
  getMyEnrollmentById(enrollmentId: string) {
    return this.http.get<Enrollment>(`${this.endPoint}/${enrollmentId}`);
  }
  updateLastAccessedLecture(enrollmentId: string, lectureId: string) {
    return this.http.put(
      `${this.endPoint}/${enrollmentId}/lectures/${lectureId}/last-accessed`,
      {}
    );
  }

  markLectureCompleted(courseId: string, lectureId: string) {
    return this.http.put<Progress>(
      `${this.endPoint}/${courseId}/lectures/${lectureId}/complete`,
      {}
    );
  }

}
