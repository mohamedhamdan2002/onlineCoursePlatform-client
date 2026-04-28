import { Component } from '@angular/core';
import { StatCard, StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-learning-stats',
  imports: [
    StatCardComponent
  ],
  templateUrl: './learning-stats.component.html',
  styleUrl: './learning-stats.component.scss',
  host: {
    class: 'block'
  }
})
export class LearningStatsComponent {
  stats: StatCard[] = [
    {
      icon: 'play_circle_outline',
      count: '4',
      text: 'Courses Enrolled',
      color: 'green'
    },
    {
      icon: 'check_circle_outline',
      count: '1',
      text: 'Courses Completed',
      color: 'blue'
    },
    {
      icon: 'access_time',
      count: '156h',
      text: 'Hours Learned',
      color: 'green'
    },
    {
      icon: 'timeline',
      count: '44%',
      text: 'Average Progress',
      color: 'indigo'
    }
  ]
}
