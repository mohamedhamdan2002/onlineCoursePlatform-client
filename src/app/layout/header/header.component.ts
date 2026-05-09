import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderActionsComponent } from './header-actions/header-actions.component';
import { HeaderLinksComponent } from './header-links/header-links.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { HeaderService } from './header.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    HeaderLinksComponent,
    HeaderActionsComponent,
    MobileMenuComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  headerService = inject(HeaderService);
}
