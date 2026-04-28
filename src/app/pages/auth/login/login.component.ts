import { Component, inject, model } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Login } from '../../../core/models/auth/login';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MaterialModule,
    FormsModule,
    PasswordInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  readonly model = model<Login>({email: '', password: ''});
  readonly authService = inject(AuthService);
  readonly dialog = inject(MatDialog);
  onRegisterBtnClick() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      disableClose: true
    });
  }

  onLoginBtnClick() {
    console.log(this.model());

  }
}
