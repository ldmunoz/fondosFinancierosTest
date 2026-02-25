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
    this.fundService.unsubscribeFromFund(id);
    const fund = this.fundService.getFundById(id);
    this.refunds(fund?.monto_minimo ?? 0);
  }

  refunds(amount: number): void {
    this.dashboardService.userInfo.update((user) => {
      if (user) {
        user.saldo += amount;
      }
      return user;
    });
  }
}
