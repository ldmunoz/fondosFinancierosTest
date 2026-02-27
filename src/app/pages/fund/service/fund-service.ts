import { Injectable, computed, inject, signal } from '@angular/core';
import { Fund } from '../../dashboard/models/fund';
import { CFund } from '../../shared/constant/CFund';
import { HistoryService } from '../../history/service/history-service';

@Injectable({
  providedIn: 'root',
})
export class FundService {
  private historyService: HistoryService = inject(HistoryService);
  // Source of truth as a private signal
  private fundsSignal = signal<Fund[]>(CFund);

  // Public readonly signals for the component
  readonly allFunds = this.fundsSignal.asReadonly();

  readonly fundsAvailable = computed(() => this.fundsSignal().filter((f) => f.estaSuscrito));

  readonly fundsNotAvailable = computed(() => this.fundsSignal().filter((f) => !f.estaSuscrito));

  readonly fundsAvailableCount = computed(() => this.fundsAvailable().length);
  readonly allFundsCount = computed(() => this.fundsSignal().length);

  /**
   * Updates a fund's subscription status reactively
   */
  subscribeToFund(id: number, amount: number) {
    this.fundsSignal.update((funds) =>
      funds.map((f) => (f.id === id ? { ...f, estaSuscrito: true, monto_suscrito: amount } : f)),
    );
    this.historyService.setHistory({
      id: this.historyService.getHistories().length + 1,
      date: new Date(),
      type: 'Suscripción',
      description: `Suscripción al fondo ${this.getFundById(id).nombre}`,
      amount: amount,
    });
  }

  getPaginatedNotAvailable(page: number, pageSize: number): Fund[] {
    const start = (page - 1) * pageSize;
    return this.fundsNotAvailable().slice(start, start + pageSize);
  }

  unsubscribeFromFund(id: number) {
    this.fundsSignal.update((funds) =>
      funds.map((f) => (f.id === id ? { ...f, estaSuscrito: false } : f)),
    );

    this.historyService.setHistory({
      id: this.historyService.getHistories().length + 1,
      date: new Date(),
      type: 'Cancelación',
      description: `Cancelación de suscripción al fondo ${this.getFundById(id).nombre}`,
      amount: this.getFundById(id).monto_minimo,
    });
  }

  getFundById(id: number): Fund {
    return this.fundsSignal().find((f) => f.id === id)!;
  }
}
