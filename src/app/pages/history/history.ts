import { Component } from '@angular/core';
import { HistoryService } from './service/history-service';
import { IHistory } from './models/history';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  listHistories: IHistory[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.listHistories = this.historyService.getHistories();
  }
}
