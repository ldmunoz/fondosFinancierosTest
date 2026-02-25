import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardService } from '../../pages/dashboard/service/dashboard-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly dashboardService = inject(DashboardService);

  isOpen = input(false);
  isCollapsed = input(false);
  closeSidebar = output<void>();
  toggleCollapse = output<void>();

  onNavClick() {
    this.closeSidebar.emit();
  }
}
