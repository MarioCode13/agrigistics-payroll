import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-navigation-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent {
  navigationItems = [
    { icon: 'dashboard', label: 'Item 1', active: false },
    { icon: 'people', label: 'Item 2', active: true },
    { icon: 'account_balance_wallet', label: 'Item 3', active: false },
    { icon: 'assessment', label: 'Item 4', active: false },
    { icon: 'settings', label: 'Item 5', active: false },
    { icon: 'help', label: 'Item 6', active: false }
  ];

  onNavigationClick(item: any): void {
    // Static UI - no functionality required
    console.log('Navigation clicked:', item.label)
  }
}
