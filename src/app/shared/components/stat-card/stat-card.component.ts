import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export interface StatCard {
  icon: string;
  color: string;
  count: string;
  text: string;
}
@Component({
  selector: 'app-stat-card',
  imports: [
    MatIcon
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  stat = input.required<StatCard>();
}
