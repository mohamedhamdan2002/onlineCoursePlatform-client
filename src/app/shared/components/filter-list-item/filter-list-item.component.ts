import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list'
@Component({
  selector: 'app-filter-list-item',
  imports: [
    MatListModule,
    FormsModule
  ],
  templateUrl: './filter-list-item.component.html',
  styleUrl: './filter-list-item.component.scss',
  host: {
    class: 'block'
  }
})
export class FilterListItemComponent {
  itemValue = input.required<keyof any>();
  itemName = input.required<keyof any>();
  items = input<any[]>();
  selectedItems = output<any[]>();
  selected: any[] = [];

  onSelectionChanges() {
    this.selectedItems.emit(this.selected);
  }

}

