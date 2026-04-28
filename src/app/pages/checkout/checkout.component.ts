import { Component, input } from '@angular/core';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    PaymentFormComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  courseId = input.required<string>();

}
