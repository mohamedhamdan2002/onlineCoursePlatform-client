import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
@Component({
  selector: 'app-paypal',
  imports: [
    NgxPayPalModule
  ],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.scss',
})
export class PaypalComponent {
  router = inject(Router);
  courseId = input.required<string>();
  public payPalConfig?: IPayPalConfig;
  paymentOrder = {
    paymentId: '',
    status: '',
    orderId: ''
  }

    ngOnInit(): void {
        this.initConfig();
    }

    private initConfig(): void {
      this.payPalConfig = {
            clientId: 'ATBRkoTTZXi-ePunpCglVSXnO5nrdX7lLiDP5v3Qc07oT4nYgcpobwMJNUGCRKzmHkgReVZmnASx9XJX',
            // for creating orders (transactions) on server see
            // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
            createOrderOnServer: (data) => fetch('http://localhost:5050/api/payments/create', {
              method: 'post',
              headers: {
                'content-Type': 'application/json'
              },
              body: JSON.stringify({
                courseId: this.courseId()
              })
            })
              .then((res) => res.json())
              .then((order) => {
                console.log(order);
                this.paymentOrder = {
                  paymentId: order.paymentId,
                  orderId: order.orderId,
                  status: order.status
                }
                return order.orderId;
              }),
            onApprove: (data) => {
              console.log(data)
              return fetch('http://localhost:5050/api/payments/capture', {
                method: 'post',
                headers:  {
                  'content-Type': "application/json"
                },
                body: JSON.stringify({
                  orderId: data.orderID,
                  paymentId: this.paymentOrder.paymentId
                }
              )}).then((res) => {
                console.log(res.json());
                if(res)
                  this.router.navigate(['order-success'])
              });
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);

            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);

            },
        };
    }
}
