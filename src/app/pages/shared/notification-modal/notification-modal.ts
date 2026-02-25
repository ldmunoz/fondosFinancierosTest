import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fund } from '../../dashboard/models/fund';

@Component({
  selector: 'app-notification-modal',
  imports: [CommonModule],
  templateUrl: './notification-modal.html',
  styleUrl: './notification-modal.css',
})
export class NotificationModal {
  @Input() fund!: Fund | undefined;
  @Input() status: 'success' | 'error' = 'success';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
