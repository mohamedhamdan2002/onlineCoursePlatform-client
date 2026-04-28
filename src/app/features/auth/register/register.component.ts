import { Component, inject, model, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Register } from '../models/Register';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-register',
  imports: [
    MaterialModule,
    FormsModule,
    PasswordInputComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly authService = inject(AuthService);
  readonly dialogRef = inject(MatDialogRef<RegisterComponent>);
  readonly model = signal<Register>({firstName: '', lastName: '',email: '', password: ''});
  confirmPassword = '';

  onSubmit() {
    console.log("a7a");
  }

}
