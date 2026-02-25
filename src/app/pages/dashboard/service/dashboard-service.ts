import { Injectable, signal } from '@angular/core';
import { UserInfo } from '../../shared/models/userInfo';
import { CUserInfo } from '../../shared/constant/CUserInfo';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  userInfo = signal<UserInfo | null>(null);

  constructor() {
    this.userInfo.set(CUserInfo);
    console.log(this.userInfo());
  }

  getFundsClient(): number {
    return this.userInfo()?.saldo ?? 0;
  }

  discountFunds(amount: number): void {
    this.userInfo.update((user) => {
      if (user) {
        user.saldo -= amount;
      }
      return user;
    });
  }
}
