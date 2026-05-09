import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../pages/auth/login/login.component';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { Router, RouterLink } from '@angular/router';
import { CourseStore } from '../../../core/stores/course.store';
import { AuthStore } from '../../../core/stores/auth.store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderService } from '../header.service';
@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatBadge,
    RouterLink,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss',
})
export class HeaderActionsComponent {
  readonly dialog = inject(MatDialog);
  readonly store = inject(CourseStore);
  readonly authStore = inject(AuthStore);
  headerService = inject(HeaderService);
  onSignInBtnClick() {
    const dialogRef = this.dialog.open(LoginComponent, {
      disableClose: true
    });
  }

  onLogoutBtnClick() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }

  private router = inject(Router);

  user = signal({
    name: 'Mohamed',
    email: 'mohamed@gmail.com',
    role: 'student'
  });

  navigateDashboard() {

    if (this.user()?.role === 'student') {
      this.router.navigate(['/student/dashboard']);
    }
    else {
      this.router.navigate(['/instructor/dashboard']);
    }
  }

}
