import { Component, inject } from '@angular/core';
import { TableFunds } from '../shared/table-funds/table-funds';
import { FundService } from './service/fund-service';
import { Fund as IFund } from '../dashboard/models/fund';

@Component({
  selector: 'app-fund',
  imports: [TableFunds],
  templateUrl: './fund.html',
  styleUrl: './fund.css',
})
export class Fund {
  private readonly fundService = inject(FundService);

  readonly fundsSubscribedCount = this.fundService.fundsAvailableCount;
  readonly fundsSubscribed = this.fundService.fundsAvailable;

  onUnsubscribe(fund: number) {
    this.fundService.unsubscribeFromFund(fund);
  }
}
