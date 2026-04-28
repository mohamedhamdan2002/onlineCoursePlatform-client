import { Component, inject, OnInit } from '@angular/core';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { SideBarComponent } from '../../layout/side-bar/side-bar.component';
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CourseStore } from '../../core/stores/course.store';
@Component({
  selector: 'app-course-grid',
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    FormsModule,
    MatLabel,
    MatSelect,
    MatOption,
    MatPrefix,
    SideBarComponent,
    CourseCardComponent,
    MatPaginator
],
  templateUrl: './course-grid.component.html',
  styleUrl: './course-grid.component.scss',
})
export class CourseGridComponent implements OnInit {
  store = inject(CourseStore);
  ngOnInit(): void {
    this.store.loadCategories();
    this.store.loadCoursePageList();
  }

  onPageChange(event: PageEvent) {
    this.store.setPage(event.pageIndex + 1);
    this.store.setPageSize(event.pageSize);
    this.store.loadCoursePageList();
  }

}
