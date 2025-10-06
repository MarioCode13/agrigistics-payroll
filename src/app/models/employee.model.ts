export interface PayrollEntry {
  id: number;
  name: string;
  description: string;
  type: 'earning' | 'deduction';
  quantity: number;
  rate: number;
  amount: number;
  date: string;
}

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  hireDate: string;
  salary: number;
  bonus: number;
  overtime: number;
  totalEarnings: number;
  taxDeductions: number;
  benefits: number;
  netPay: number;
  status: string;
  avatar: string;
  employeeNo: string;
  team: string;
  payrollEntries?: PayrollEntry[];
}

export interface PayrollSummary {
  totalEmployees: number;
  totalPayroll: number;
  averageSalary: number;
  totalTaxDeductions: number;
  totalBenefits: number;
  totalNetPay: number;
}

export interface PayrollData {
  employees: Employee[];
  summary: PayrollSummary;
}
