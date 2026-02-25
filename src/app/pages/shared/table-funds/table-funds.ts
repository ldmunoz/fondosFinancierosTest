import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { Fund } from '../../dashboard/models/fund';

@Component({
  selector: 'app-table-funds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-funds.html',
  styleUrl: './table-funds.css',
})
export class TableFunds {
  @Input({ required: true }) funds: Fund[] = [];
  @Input() pageSize = 5;
  @Input() title = 'Fondos disponibles';

  @Output() subscribe = new EventEmitter<number>();

  currentPage = signal(1);

  readonly paginatedFunds = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.funds.slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() => Math.ceil(this.funds.length / this.pageSize));

  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  onSubscribe(id: number) {
    this.subscribe.emit(id);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  formatCurrency(value: number): string {
    return `$ ${value.toLocaleString('es-CO')}`;
  }
}
