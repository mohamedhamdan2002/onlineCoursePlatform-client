import { Component, effect, inject, model, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Login } from '../../../core/models/auth/login';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { AuthStore } from '../../../core/stores/auth.store';

@Component({
  selector: 'app-login',
  imports: [
    MaterialModule,
    PasswordInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private dialogRef = inject(MatDialogRef<LoginComponent>);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);
  readonly store = inject(AuthStore);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    effect(() => {
      console.log(this.store.isAuthenticated());
      console.log(this.store.token());
      console.log(!!this.store.token());

      if (this.store.isAuthenticated()) {
        this.dialogRef.close();
      }
    });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onLoginBtnClick() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.login(this.form.value as Login);
  }

  onCancelBtnClick() { this.dialogRef.close(); }

  onRegisterBtnClick() {
    this.dialog.open(RegisterComponent, { disableClose: true });
    this.dialogRef.close();
  }
}
