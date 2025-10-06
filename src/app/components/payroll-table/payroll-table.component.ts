import { Component, OnInit, OnChanges, Input, Output, EventEmitter, signal, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule, Sort } from '@angular/material/sort'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'
import { formatCurrency } from '../../shared/utils/currency.util'

import { PayrollService } from '../../services/payroll.service'
import { Employee, PayrollEntry } from '../../models/employee.model'

@Component({
  selector: 'app-payroll-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatSortModule,
    MatInputModule, MatIconModule, MatButtonModule, MatTooltipModule
  ],
  templateUrl: './payroll-table.component.html',
  styleUrls: ['./payroll-table.component.css']
})
export class PayrollTableComponent implements OnInit, OnChanges {
  @Input() isEmployeeListMode = true;
  @Input() selectedEmployee: Employee | null = null;
  @Output() employeeSelected = new EventEmitter<Employee>();

  employeeListColumns = ['name', 'position', 'department', 'salary', 'status', 'actions'];
  payrollDetailColumns = ['name', 'description', 'type', 'quantity', 'rate', 'amount'];
  searchTerm = signal('');
  sortColumn = signal<string>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');


  public formatCurrency = formatCurrency;

  payrollEntries = computed(() => {
    if (!this.selectedEmployee?.payrollEntries) return []

    const search = this.searchTerm().toLowerCase()

    const filteredEntries = this.selectedEmployee.payrollEntries.filter(entry =>
      entry.name.toLowerCase().includes(search) ||
      (entry.description && entry.description.toLowerCase().includes(search))
    )

    const column = this.sortColumn()
    const direction = this.sortDirection()

    return [...filteredEntries].sort((a, b) => {
      let aValue: any = a[column as keyof PayrollEntry] || ''
      let bValue: any = b[column as keyof PayrollEntry] || ''

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  });

  sortedEmployees = computed(() => {
    const search = this.searchTerm().toLowerCase()

    const filteredEmployees = this.payrollService.sortedEmployees().filter(employee =>
      employee.name.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
    )

    const column = this.sortColumn()
    const direction = this.sortDirection()

    return [...filteredEmployees].sort((a, b) => {
      let aValue: any = a[column as keyof Employee] || ''
      let bValue: any = b[column as keyof Employee] || ''

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  });

  constructor(public payrollService: PayrollService) { }

  ngOnInit(): void {
    console.log('Employee data:', this.payrollService.sortedEmployees())
  }

  ngOnChanges(): void { }

  onEmployeeClick(employee: Employee): void {
    if (this.isEmployeeListMode) {
      this.employeeSelected.emit(employee)
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement
    this.searchTerm.set(target.value)
  }

  onSortChange(sort: Sort): void {
    if (this.sortColumn() === sort.active) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc')
    } else {
      this.sortColumn.set(sort.active)
      this.sortDirection.set('asc')
    }
  }
}