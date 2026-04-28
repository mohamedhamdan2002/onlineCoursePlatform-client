import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { PaypalComponent } from '../../../shared/components/paypal/paypal.component';
@Component({
  selector: 'app-payment-form',
  imports: [
    MatIcon,
    MatRadioButton,
    MatRadioGroup,
    PaypalComponent
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent {
  courseId = input.required<string>()
}
