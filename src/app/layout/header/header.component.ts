import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { HeaderActionsComponent } from '../header-actions/header-actions.component';
import { HeaderLinksComponent } from '../header-links/header-links.component';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule,
    HeaderActionsComponent,
    HeaderLinksComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

}
