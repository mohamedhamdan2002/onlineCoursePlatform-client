import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

import { Enrollment } from '../../../core/models/courses/enrollment';

@Component({
  selector: 'app-continue-watching-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './continue-watching-card.component.html',
  styleUrl: './continue-watching-card.component.scss'
})
export class ContinueWatchingCardComponent {

  enrollment = input.required<Enrollment>();

  continue = output<Enrollment>();

  onContinue() {
    this.continue.emit(this.enrollment());
  }
}
