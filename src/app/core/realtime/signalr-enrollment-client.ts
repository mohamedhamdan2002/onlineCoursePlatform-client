import { effect, inject, Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { environment } from "../../../environments/environment";
import { Enrollment } from "../models/courses/enrollment";
import { AuthStore } from "../stores/auth.store";
export const HubMethods = {
  Enrollments: {
    EnrollmentCreated: 'EnrollmentCreated'
  }
} as const;
@Injectable({
  providedIn: 'root'
})
export class SignalREnrollmentClient {
  private hubConnection: HubConnection;
  authStore = inject(AuthStore);
  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/${environment.enrollmentHub}`, {
        accessTokenFactory: () => this.authStore.token() ?? ''
      }).withAutomaticReconnect()
      .build();

    effect(() => {
      if (this.authStore.isAuthenticated()) {
        this.startConnection();
      } else {
        this.disconnect();
      }
    });
  }
  startConnection() {
    if (this.hubConnection.state !== HubConnectionState.Disconnected) return;
    this.hubConnection.start()
      .then(() => console.log("signalR connection started"))
      .catch(err => console.log(err));
  }

  onEnrollmentCreated(callBack: (data: Enrollment) => void) {
    this.hubConnection.on(HubMethods.Enrollments.EnrollmentCreated, callBack);
  }

  disconnect() {
    if (this.hubConnection.state !== HubConnectionState.Disconnected) {
      this.hubConnection.stop();
    }
  }
}
