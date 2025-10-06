import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-actions-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './actions-panel.component.html',
})
export class ActionsPanelComponent {
  quickActions = [
    { icon: 'school', label: 'Action 1', color: 'primary' },
    { icon: 'school', label: 'Action 2', color: 'primary' }
  ];

  onQuickAction(action: any): void {
    console.log('Quick action clicked:', action.label)
  }
}
