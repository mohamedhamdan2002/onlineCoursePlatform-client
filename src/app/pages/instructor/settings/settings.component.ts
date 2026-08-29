import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-settings',
  imports: [
    MaterialModule,
    MatInputModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

}
