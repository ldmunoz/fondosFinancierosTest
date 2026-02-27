import { Component, inject, output, signal, computed, Input, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { DashboardService } from '../../service/dashboard-service';
import { FundService } from '../../../fund/service/fund-service';
import { Fund } from '../../models/fund';

/**
 * Supported notification preferences.
 */
export type NotificationPreference = 'email' | 'sms';

/**
 * Minimum investment amount constant.
 */
const MINIMUM_INVESTMENT_AMOUNT = 1000;

@Component({
  selector: 'app-modal-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-creation.html',
})
export class ModalCreationComponent implements OnInit {
  protected readonly dashboardService = inject(DashboardService);
  private readonly fundService = inject(FundService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly close = output<void>();
  readonly invest = output<{ fundId: number; amount: number }>();
  /** The specific fund the user wants to invest in. */
  @Input({ required: true }) fund!: Fund;

  constructor() {
    /**
     * Effect to refresh funds when the component is active.
     */
    effect(() => {
      this.dashboardService.fundsClient();
    });
  }

  ngOnInit(): void {
    // Listen for amount changes to update insufficient balance state
    this.amountControl.valueChanges.subscribe((value) => {
      this.updateBalanceValidation(Number(value));
    });

    this.investmentForm.get('amount')?.setValue(this.fund.monto_minimo);
  }

  // Form Configuration
  /** Reactive form for investment details. */
  readonly investmentForm: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(MINIMUM_INVESTMENT_AMOUNT)]],
    notificationPreference: ['', Validators.required],
  });

  // State
  /** Signal to track if the balance is insufficient based on the current input. */
  readonly isInsufficientBalance = signal(false);

  /**
   * Computed signal to calculate the remaining balance if the investment is made.
   * Returns a positive value representing the shortage, or 0 if balance is sufficient.
   */
  readonly balanceShortage = computed(() => {
    const amount = Number(this.amountControl.value) || 0;
    const currentBalance = this.dashboardService.fundsClient();
    return Math.max(0, amount - currentBalance);
  });

  /**
   * Sets the investment amount to the maximum available balance.
   */
  useMaxBalance(): void {
    const maxBalance = this.dashboardService.fundsClient();
    this.amountControl.setValue(maxBalance);
  }

  /**
   * Updates the notification preference in the form.
   * @param pref The selected notification preference.
   */
  setNotificationPreference(pref: NotificationPreference): void {
    this.notificationPreferenceControl.setValue(pref);
  }

  /**
   * Validates and submits the investment form.
   */
  confirmInvestment(): void {
    if (this.investmentForm.invalid) {
      this.investmentForm.markAllAsTouched();
      return;
    }

    if (this.fund.monto_minimo > this.amountControl.value) {
      this.investmentForm.get('amount')?.setErrors({ min: true });
      this.investmentForm.markAllAsDirty();
      return;
    }

    const amount = Number(this.amountControl.value);
    const fundId = this.fund?.id;

    if (fundId && amount >= MINIMUM_INVESTMENT_AMOUNT && !this.balanceShortage()) {
      this.invest.emit({ fundId, amount });
    } else {
      // If validation passed but internal logic failed, mark as touched to show errors
      this.investmentForm.markAllAsTouched();
    }
  }

  /**
   * Triggers the close output.
   */
  closeModal(): void {
    this.close.emit();
  }

  /**
   * Logic to determine if current input exceeds available balance.
   * @param amount Current amount being entered.
   */
  private updateBalanceValidation(amount: number): void {
    const hasInsufficientBalance = amount > this.dashboardService.fundsClient();
    this.isInsufficientBalance.set(hasInsufficientBalance);
  }

  // Accessors for Form Controls to improve template readability
  get amountControl(): FormControl {
    return this.investmentForm.get('amount') as FormControl;
  }

  get notificationPreferenceControl(): FormControl {
    return this.investmentForm.get('notificationPreference') as FormControl;
  }
}
