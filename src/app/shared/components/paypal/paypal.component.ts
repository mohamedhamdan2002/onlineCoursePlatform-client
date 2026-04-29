import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { PaymentService } from '../../../core/services/payment.service';
import { firstValueFrom } from 'rxjs';
import { PaymentOrder } from '../../../core/models/courses/payment-order';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-paypal',
  imports: [
    NgxPayPalModule
  ],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.scss',
})
export class PaypalComponent {
  paypalLoaded = false;
  router = inject(Router);
  courseId = input.required<string>();
  paymentService = inject(PaymentService);
  public payPalConfig?: IPayPalConfig;
  paymentOrder = {} as PaymentOrder;
  onPaypalLoaded() {
    this.paypalLoaded = true;
  }
  ngOnInit(): void {
      this.initConfig();
  }

    private initConfig(): void {
      this.payPalConfig = {
            clientId: environment.paypalClientId,
            createOrderOnServer: () => firstValueFrom(
              this.paymentService.createOrder(this.courseId())
            )
            .then((order) => {
                this.paymentOrder = {
                  paymentId: order.paymentId,
                  orderId: order.orderId,
                  status: order.status
                }
                return order.orderId;
              }),
            onApprove: (data) => {
              console.log(data);
              return firstValueFrom(
                this.paymentService.captureOrder(
                  data.orderID,
                  this.paymentOrder.paymentId
                )
              )
              .then(() => {
                  this.router.navigate(['order-success'])
              });
            },
            onCancel: () => {
              this.router.navigate(['/courses', this.courseId()]);
            },
            onError: err => {
                console.log('OnError', err);
            }
        };
    }
}
