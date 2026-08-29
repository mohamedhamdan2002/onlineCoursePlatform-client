import { Component, input, output, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../../core/models/courses/course';
import { CourseLevel } from '../../../core/stores/course.store';
import { FilterListItemComponent } from '../filter-list-item/filter-list-item.component';
import { FormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';


export type FilterModel = {
  categories: Category[];
  levels: CourseLevel[];
  priceRange: [number, number];
  minRating: number | null;
}
export type CourseFilter = {
  categories: string[],
  levels: string[],
  minRating: number | null,
  priceRange: [number, number];
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatRadioButton,
    MatRadioGroup,
    MatSliderModule,
    MatIconModule,
    FilterListItemComponent,
    FormsModule
  ],
  templateUrl: './filter-sidebar.component.html'
})
export class FilterSidebarComponent {
  filters = input.required<FilterModel>();
  filtersChange = output<CourseFilter>();
  selectedFilters = signal<CourseFilter>({
    categories: [],
    levels: [],
    minRating: null,
    priceRange:[0, 1000]
  });
  ratings = [4.5, 4.0, 3.5, 3.0];

  private emit(updated: any) {
    this.selectedFilters.update(current => ({
      ...current,
      ...updated
    }));
    this.filtersChange.emit(this.selectedFilters());
  }

  onLevelChanges(levels: number[]){
    this.emit({ levels: levels });
  }
  onCategoriesChanges(categories: string[]){
    this.emit({ categories: categories });
  }
  setRating(rating: number) {
    this.emit({ minRating: rating });
  }

  onMinPriceChange(value: number) {
    this.selectedFilters.update(current => ({
      ...current,
      priceRange: [value, current.priceRange[1]]
    }));

    this.filtersChange.emit(this.selectedFilters());
  }

  onMaxPriceChange(value: number) {
    this.selectedFilters.update(current => ({
      ...current,
      priceRange: [current.priceRange[0], value]
    }));

    this.filtersChange.emit(this.selectedFilters());
  }

}
