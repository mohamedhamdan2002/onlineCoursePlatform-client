import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { CourseStore } from '../../core/stores/course.store';
import { AuthStore } from '../../core/stores/auth.store';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-header-actions',
  imports: [
    MatButton,
    MatIconButton,
    MatIcon,
    MatBadge,
    RouterLink,
    MatMenuModule
  ],
  templateUrl: './header-actions.component.html',
  styleUrl: './header-actions.component.scss',
})
export class HeaderActionsComponent {
  readonly dialog = inject(MatDialog);
  readonly store = inject(CourseStore);
  readonly authStore = inject(AuthStore);
  onSignInBtnClick() {
    const dialogRef = this.dialog.open(LoginComponent, {
      disableClose: true
    });
  }

  onLogoutBtnClick() {
    this.authStore.logout();
  }
}
