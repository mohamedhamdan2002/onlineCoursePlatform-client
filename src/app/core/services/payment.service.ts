import { Injectable } from "@angular/core";
import { PaymentOrder } from "../models/courses/payment-order";
import { BaseApiService } from "./base-api.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseApiService {


  createOrder(courseId: string) {
    return this.http.post<PaymentOrder>(`${this.baseUrl}/payments/create`, { courseId });
  }

  captureOrder(orderId: string, paymentId: string) {
    return this.http.post(`${this.baseUrl}/payments/capture`, { orderId, paymentId });
  }
}
