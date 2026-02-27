import { computed, Injectable, signal } from '@angular/core';
import { UserInfo } from '../../shared/models/userInfo';
import { CUserInfo } from '../../shared/constant/CUserInfo';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  userInfo = signal<UserInfo | null>(null);

  readonly fundsClient = computed(() => this.userInfo()?.saldo ?? 0);
  constructor() {
    this.userInfo.set(CUserInfo);
  }

  discountFunds(amount: number): void {
    this.userInfo.update((user) => {
      if (user) {
        return {
          ...user,
          saldo: user.saldo - amount,
        };
      }
      return user;
    });
  }
}
