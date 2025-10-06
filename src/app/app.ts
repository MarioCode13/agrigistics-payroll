import { Component, signal, computed } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { PayrollTableComponent } from './components/payroll-table/payroll-table.component'
import { EmployeePanelComponent } from './components/employee-panel/employee-panel.component'
import { NavigationPanelComponent } from './components/navigation-panel/navigation-panel.component'
import { ActionsPanelComponent } from './components/actions-panel/actions-panel.component'
import { PayrollService } from './services/payroll.service'
import { Employee } from './models/employee.model'

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PayrollTableComponent,
    EmployeePanelComponent,
    NavigationPanelComponent,
    ActionsPanelComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Agrigistics Payroll System';
  selectedEmployee = signal<Employee | null>(null);

  // Computed to determine current view
  currentView = computed(() => {
    return this.selectedEmployee() ? 'payroll-detail' : 'employee-list'
  });

  constructor(public payrollService: PayrollService) {
    // Load data on app initialization
    console.log('App initialized, loading payroll data...')
    this.payrollService.loadPayrollData().subscribe({
      next: (data) => {
        console.log('Data loaded in app component:', data)
      },
      error: (error) => {
        console.error('Error loading payroll data:', error)
      }
    })
  }

  onEmployeeSelected(employee: Employee) {
    this.selectedEmployee.set(employee)
    console.log('Selected Employee:', employee)
    console.log('Employee Team:', employee.team) // Debug log for team property
  }

  onBackToEmployeeList() {
    this.selectedEmployee.set(null)
  }

  onSearch(event: Event) {
    const input = (event.target as HTMLInputElement).value
    console.log('Search input:', input)
    // Add search logic here
  }
}
