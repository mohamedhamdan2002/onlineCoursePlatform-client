import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  totalPages = input.required<number>();
  page = output<number>();

  setPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.page.emit(page);
  }
}
