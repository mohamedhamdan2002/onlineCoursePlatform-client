import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatPrefix } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../header.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-mobile-menu',
  imports: [
    MatFormFieldModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatPrefix,
    MatIcon
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  mobileMenuOpen = signal(false);
  headerService = inject(HeaderService);
}
