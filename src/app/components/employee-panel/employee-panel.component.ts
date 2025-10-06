import { Component, OnInit, Input, computed, signal, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

import { PayrollService } from '../../services/payroll.service'
import { Employee } from '../../models/employee.model'
import { formatCurrency } from '../../shared/utils/currency.util'

@Component({
  selector: 'app-employee-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './employee-panel.component.html',
})
export class EmployeePanelComponent implements OnInit {
  @Input() selectedEmployee: Employee | null = null;
  @Input() searchTerm: string = '';
  @Output() backToEmployeeList = new EventEmitter<void>();

  // Computed values for summary
  totalEmployees = computed(() => this.payrollService.payrollSummary()?.totalEmployees || 0);
  totalPayroll = computed(() => this.payrollService.payrollSummary()?.totalPayroll || 0);
  averageSalary = computed(() => this.payrollService.payrollSummary()?.averageSalary || 0);
  totalTaxDeductions = computed(() => this.payrollService.payrollSummary()?.totalTaxDeductions || 0);
  totalBenefits = computed(() => this.payrollService.payrollSummary()?.totalBenefits || 0);
  totalNetPay = computed(() => this.payrollService.payrollSummary()?.totalNetPay || 0);

  // Computed values for selected employee breakdown
  totalEarnings = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return 0
    return this.selectedEmployee.payrollEntries
      .filter(entry => entry.type === 'earning')
      .reduce((sum, entry) => sum + entry.amount, 0)
  });

  totalDeductions = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return 0
    return this.selectedEmployee.payrollEntries
      .filter(entry => entry.type === 'deduction')
      .reduce((sum, entry) => sum + entry.amount, 0)
  });

  netTotal = computed(() => {
    return this.totalEarnings() - this.totalDeductions()
  });

  gapAmount = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return 0
    const gapEntry = this.selectedEmployee.payrollEntries.find(entry => entry.name.includes('GAP'))
    return gapEntry?.amount || 0
  });

  uifAmount = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return 0
    const uifEntry = this.selectedEmployee.payrollEntries.find(entry => entry.name.includes('UIF'))
    return uifEntry?.amount || 0
  });

  payeAmount = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return 0
    const payeEntry = this.selectedEmployee.payrollEntries.find(entry => entry.name.includes('PAYE'))
    return payeEntry?.amount || 0
  });

  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  filteredAndSortedPayrollEntries = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return []

    const search = this.searchTerm.toLowerCase()

    const filteredEntries = this.selectedEmployee.payrollEntries.filter(entry =>
      entry.name.toLowerCase().includes(search) ||
      (entry.description && entry.description.toLowerCase().includes(search))
    )

    return [...filteredEntries].sort((a, b) => {
      let aValue: any = a[this.sortColumn as keyof typeof a] || ''
      let bValue: any = b[this.sortColumn as keyof typeof b] || ''

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  });

  public formatCurrency = formatCurrency;

  constructor(public payrollService: PayrollService) { }

  ngOnInit(): void { }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  onBackToEmployeeList() {
    this.backToEmployeeList.emit()
  }

  onSortChange(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortColumn = column
      this.sortDirection = 'asc'
    }
  }
}
