import { Component, inject, OnInit, signal } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { FundService } from '../fund/service/fund-service';
import { TableFunds } from '../shared/table-funds/table-funds';
import { DashboardService } from './service/dashboard-service';
import { NotificationModal } from '../shared/notification-modal/notification-modal';
import { Fund } from './models/fund';
import { ModalCreationComponent } from './components/modal-creation/modal-creation';

@Component({
  selector: 'app-dashboard',
  imports: [TableFunds, NotificationModal, ModalCreationComponent, CurrencyPipe],
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
  showModalNotification = signal(false);
  showModalCreation = signal(false);
  modalStatus = signal<'success' | 'error'>('success');
  modalMessage = signal<string>('');
  amountToInvest: number = 0;

  onSubscribe(id: number) {
    this.selectedFund = this.fundService.getFundById(id);

    if (this.dashboardService.fundsClient() < this.selectedFund.monto_minimo) {
      this.modalStatus.set('error');
      this.modalMessage.set(
        `No tienes saldo suficiente para vincularte al fondo ${this.selectedFund.nombre}`,
      );
      this.showModalNotification.set(true);
      return;
    }

    this.showModalCreation.set(true);
  }

  onInvestFromModal(data: { fundId: number; amount: number }) {
    this.selectedFund = this.fundService.getFundById(data.fundId);

    this.dashboardService.discountFunds(data.amount);
    // save history
    this.fundService.subscribeToFund(data.fundId, data.amount);

    this.modalStatus.set('success');
    this.modalMessage.set(`Te has suscrito exitosamente al fondo ${this.selectedFund.nombre}`);
    this.amountToInvest = data.amount;
    this.showModalNotification.set(true);
    this.showModalCreation.set(false);
  }

  ngOnInit() {
    this.fundClient = this.dashboardService.fundsClient();
  }

  closeModalCreation() {
    this.showModalCreation.set(false);
  }

  closeModal() {
    this.showModalNotification.set(false);
  }
}
