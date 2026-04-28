import { Component } from '@angular/core';
import { FilterListItemComponent } from '../../shared/components/filter-list-item/filter-list-item.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-side-bar',
  imports: [
    FilterListItemComponent,
    MatDivider
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  host: {
    class: 'block'
  }
})
export class SideBarComponent {

}
