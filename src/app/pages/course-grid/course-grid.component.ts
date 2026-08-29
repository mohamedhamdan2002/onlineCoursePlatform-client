import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { CourseStore } from '../../core/stores/course.store';
import { CourseFilter, FilterSidebarComponent } from '../../shared/components/filter-sidebar/filter-sidebar.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
@Component({
  selector: 'app-course-grid',
  imports: [
    FormsModule,
    CourseCardComponent,
    PaginatorComponent,
    FilterSidebarComponent
],
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.scss',
})
export class CourseGridComponent implements OnInit {
  store = inject(CourseStore);
  filters = computed(() => {
    return {
      categories: this.store.categories(),
      levels: this.store.levels(),
      priceRange: [10, 1000] as [number, number],
      minRating: 0
  }
  })

  ngOnInit(): void {
    if(this.store.levels().length == 0) {
      this.store.loadLevels();
    }
    if(this.store.categories().length == 0) {
      this.store.loadCategories();
    }
    this.store.loadCoursePageList();

  }

  onPageChange(page: number) {
    if(page == this.store.page()) return;
    this.store.setPage(page);
    this.store.loadCoursePageList();
  }

  showMobileFilters = signal(false);
  updateFilters(newFilters: CourseFilter) {
      this.store.setCourseFilters(newFilters);
      this.store.loadCoursePageList();
  }

  onSearch(searchValue: string) {
    this.store.setSearchQuery(searchValue);
    this.store.loadCoursePageList();
  }

  onSorting(sortValue: string) {
    this.store.setSortBy(sortValue);
    this.store.loadCoursePageList();
  }

}
