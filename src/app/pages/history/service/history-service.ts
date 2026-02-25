import { Injectable } from '@angular/core';
import { IHistory } from '../models/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private histories: IHistory[] = [];

  getHistories(): IHistory[] {
    return this.histories;
  }

  setHistory(history: IHistory): void {
    this.histories.push(history);
  }
}
