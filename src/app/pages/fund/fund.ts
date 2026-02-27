import { Component, inject } from '@angular/core';
import { TableFunds } from '../shared/table-funds/table-funds';
import { FundService } from './service/fund-service';
import { DashboardService } from '../dashboard/service/dashboard-service';

@Component({
  selector: 'app-fund',
  imports: [TableFunds],
  templateUrl: './fund.html',
  styleUrl: './fund.css',
})
export class Fund {
  private readonly fundService = inject(FundService);
  private readonly dashboardService = inject(DashboardService);

  readonly fundsSubscribedCount = this.fundService.fundsAvailableCount;
  readonly fundsSubscribed = this.fundService.fundsAvailable;

  onUnsubscribe(id: number) {
    const fund = this.fundService.getFundById(id);
    const refundAmount = fund.monto_suscrito ?? 0;

    if (refundAmount > 0) {
      this.fundService.unsubscribeFromFund(id);
      this.dashboardService.refundFunds(refundAmount);
    }
  }
}
