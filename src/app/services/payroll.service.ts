import { Injectable, signal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map, catchError, throwError } from 'rxjs'
import { Employee, PayrollData } from '../models/employee.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private payrollData = signal<PayrollData | null>(null);
  public searchTerm = signal<string>('');
  private sortColumn = signal<string>('name');
  private sortDirection = signal<'asc' | 'desc'>('asc');

  // Computed signals for filtered and sorted data
  filteredEmployees = computed(() => {
    const data = this.payrollData()
    const search = this.searchTerm()

    if (!data) return []

    if (!search.trim()) return data.employees

    return data.employees.filter(employee =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.position.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase())
    )
  });

  sortedEmployees = computed(() => {
    const employees = this.filteredEmployees()
    const column = this.sortColumn()
    const direction = this.sortDirection()

    return [...employees].sort((a, b) => {
      let aValue: any = a[column as keyof Employee]
      let bValue: any = b[column as keyof Employee]

      // Handle string comparison
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

  payrollSummary = computed(() => this.payrollData()?.summary);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  private showNotification(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, { duration })
  }

  loadPayrollData(): Observable<PayrollData> {
    return this.http.get<PayrollData>('/assets/mock-data.json').pipe(
      map(data => {
        this.showNotification('Payroll data loaded successfully!')
        this.payrollData.set(data)
        this.showNotification('Payroll data updated successfully!')
        return data
      }),
      catchError(error => {
        this.showNotification('Error occurred while loading payroll data. Please try again.')
        return throwError(() => new Error('Failed to load payroll data. Please try again later.'))
      })
    )
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term)
  }

  setSorting(column: string, direction: 'asc' | 'desc'): void {
    this.sortColumn.set(column)
    this.sortDirection.set(direction)
  }

  getEmployeeById(id: number): Employee | undefined {
    try {
      const data = this.payrollData()
      if (!data) {
        throw new Error('Payroll data is not loaded.')
      }
      const employee = data.employees.find(emp => emp.id === id)
      if (!employee) {
        throw new Error(`Employee with ID ${id} not found.`)
      }
      return employee
    } catch (error) {
      this.showNotification('Error in retrieving employee details. Please try again.')
      return undefined
    }
  }
}
