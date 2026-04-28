import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatSelectionListChange } from '@angular/material/list'
import {  Category } from '../../../features/courses/models/course';
import { CourseStore } from '../../../features/courses/course.store';
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
  selectedCategories: string[] = [];
  store = inject(CourseStore);
  onSelectionChanges() {
    this.store.setSelectedCategoriesId(this.selectedCategories);
    this.store.loadCoursePageList();
  }

}
