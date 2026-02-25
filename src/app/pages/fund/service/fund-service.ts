import { Injectable, computed, signal } from '@angular/core';
import { Fund } from '../../dashboard/models/fund';
import { CFund } from '../../shared/constant/CFund';

@Injectable({
  providedIn: 'root',
})
export class FundService {
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
  subscribeToFund(id: number) {
    this.fundsSignal.update((funds) =>
      funds.map((f) => (f.id === id ? { ...f, estaSuscrito: true } : f)),
    );
  }

  getPaginatedNotAvailable(page: number, pageSize: number): Fund[] {
    const start = (page - 1) * pageSize;
    return this.fundsNotAvailable().slice(start, start + pageSize);
  }

  unsubscribeFromFund(id: number) {
    console.log(id);
    this.fundsSignal.update((funds) =>
      funds.map((f) => (f.id === id ? { ...f, estaSuscrito: false } : f)),
    );
  }

  getFundById(id: number): Fund {
    return this.fundsSignal().find((f) => f.id === id)!;
  }
}
