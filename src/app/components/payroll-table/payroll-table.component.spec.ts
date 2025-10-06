import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PayrollTableComponent } from './payroll-table.component'
import { PayrollService } from '../../services/payroll.service'
import { Employee } from '../../models/employee.model'

describe('PayrollTableComponent', () => {
    let component: PayrollTableComponent
    let fixture: ComponentFixture<PayrollTableComponent>
    let mockPayrollService: jasmine.SpyObj<PayrollService>

    beforeEach(async () => {
        mockPayrollService = jasmine.createSpyObj('PayrollService', ['sortedEmployees'])
        mockPayrollService.sortedEmployees.and.returnValue([
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                position: 'Engineer',
                department: 'Engineering',
                salary: 70000,
                status: 'Active',
                phone: '123-456-7890',
                hireDate: '2020-01-01',
                bonus: 5000,
                payrollEntries: [],
                overtime: 10, // Added missing properties
                totalEarnings: 75000,
                taxDeductions: 5000,
                benefits: 2000,
                netPay: 70000, // Added remaining missing properties
                avatar: 'avatar1.png',
                employeeNo: 'E001',
                team: 'Development',
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                position: 'Manager',
                department: 'HR',
                salary: 80000,
                status: 'Active',
                phone: '987-654-3210',
                hireDate: '2019-05-15',
                bonus: 7000,
                payrollEntries: [],
                overtime: 5, // Added missing properties
                totalEarnings: 87000,
                taxDeductions: 7000,
                benefits: 3000,
                netPay: 80000, // Added remaining missing properties
                avatar: 'avatar2.png',
                employeeNo: 'E002',
                team: 'HR Team',
            },
        ])

        await TestBed.configureTestingModule({
            imports: [PayrollTableComponent],
            providers: [
                { provide: PayrollService, useValue: mockPayrollService },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(PayrollTableComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create the component', () => {
        expect(component).toBeTruthy()
    })

    it('should filter employees based on search term', () => {
        component.searchTerm.set('john')
        const filteredEmployees = component.sortedEmployees()
        expect(filteredEmployees.length).toBe(1)
        expect(filteredEmployees[0].name).toBe('John Doe')
    })

    it('should sort employees by name in ascending order', () => {
        component.sortColumn.set('name')
        component.sortDirection.set('asc')
        const sortedEmployees = component.sortedEmployees()
        expect(sortedEmployees[0].name).toBe('Jane Smith')
        expect(sortedEmployees[1].name).toBe('John Doe')
    })

    it('should sort employees by name in descending order', () => {
        component.sortColumn.set('name')
        component.sortDirection.set('desc')
        const sortedEmployees = component.sortedEmployees()
        expect(sortedEmployees[0].name).toBe('John Doe')
        expect(sortedEmployees[1].name).toBe('Jane Smith')
    })

    it('should update searchTerm on search input change', () => {
        const event = { target: { value: 'jane' } } as unknown as Event
        component.onSearchChange(event)
        expect(component.searchTerm()).toBe('jane')
    })

    it('should update sortColumn and sortDirection on sort change', () => {
        const sortEvent = { active: 'salary', direction: 'asc' } as any
        component.onSortChange(sortEvent)
        expect(component.sortColumn()).toBe('salary')
        expect(component.sortDirection()).toBe('asc')
    })
})