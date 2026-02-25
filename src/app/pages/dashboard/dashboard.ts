import { Component, inject, OnInit, signal } from '@angular/core';
import { FundService } from '../fund/service/fund-service';
import { TableFunds } from '../shared/table-funds/table-funds';
import { DashboardService } from './service/dashboard-service';
import { NotificationModal } from '../shared/notification-modal/notification-modal';
import { Fund } from './models/fund';

@Component({
  selector: 'app-dashboard',
  imports: [TableFunds, NotificationModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private readonly fundService = inject(FundService);
  protected readonly dashboardService = inject(DashboardService);

  fundClient: number = 0;

  readonly fundsNotAvailable = this.fundService.fundsNotAvailable;
  readonly fundsSubscribedCount = this.fundService.fundsAvailableCount;
  readonly allFundsCount = this.fundService.allFundsCount;
  selectedFund!: Fund;
  showModal = signal(false);
  modalStatus = signal<'success' | 'error'>('success');
  modalMessage = signal<string>('');

  onSubscribe(id: number) {
    this.selectedFund = this.fundService.getFundById(id);

    if (this.dashboardService.getFundsClient() < this.selectedFund.monto_minimo) {
      this.modalStatus.set('error');
      this.modalMessage.set(
        `No tienes saldo suficiente para vincularte al fondo ${this.selectedFund.nombre}`,
      );
      this.showModal.set(true);
      return;
    }

    this.fundService.subscribeToFund(id);
    this.modalStatus.set('success');
    this.modalMessage.set('');
    this.showModal.set(true);
  }

  ngOnInit() {
    this.fundClient = this.dashboardService.getFundsClient();
  }

  closeModal() {
    this.showModal.set(false);
  }
}
