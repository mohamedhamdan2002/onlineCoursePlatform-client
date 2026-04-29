import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PaymentOrder } from "../models/courses/payment-order";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:5050";

  createOrder(courseId: string) {
    return this.http.post<PaymentOrder>(`${this.apiUrl}/api/payments/create`, { courseId });
  }

  captureOrder(orderId: string, paymentId: string) {
    return this.http.post(`${this.apiUrl}/api/payments/capture`, { orderId, paymentId });
  }
}
