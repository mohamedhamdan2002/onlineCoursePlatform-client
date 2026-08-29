import { Component } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-instructor-layout',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MaterialModule
  ],
  templateUrl: './instructor-layout.component.html',
  styleUrl: './instructor-layout.component.scss',
})
export class InstructorLayoutComponent {

}
