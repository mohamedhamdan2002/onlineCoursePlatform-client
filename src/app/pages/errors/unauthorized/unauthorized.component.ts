import { Component, effect, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthStore } from '../../../core/stores/auth.store';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../../auth/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  imports: [
    MatButtonModule, MatIconModule, RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  private dialog = inject(MatDialog);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  private returnUrl = inject(ActivatedRoute).snapshot.queryParams['returnUrl'] || '/';
  constructor() {
    effect(() => {
      if (this.authStore.isAuthenticated()) {
        this.router.navigateByUrl(this.returnUrl);
      }
    });
  }

  openLogin() {
    this.dialog.open(LoginComponent, { disableClose: true });
  }
}
