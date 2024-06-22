import { Component, OnInit, inject } from '@angular/core';
import { EmployeeCardComponent } from '../../../shared/components/employee-card/employee-card.component';
import { IDepartment, IEmployee } from '../../../core/models/types';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { TokenService } from '../../../core/services/token.service';
import { DepartamentService } from '../../../core/services/departament.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EmployeeCardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Services
  private employeeS = inject(EmployeeService);

  // Variables
  public employees: IEmployee[] = [];

  constructor() {}

  quantityEmployees = '0';
  countHoursWorked = '1.000.000';
  quantifyEmployeesVacation = '5.000';

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.employeeS.getEmployeesByCompany().subscribe((employees) => {
      this.employees = employees;
     

      this.quantityEmployees = this.countEmployees();
      this.quantifyEmployeesVacation = this.countEmployeesInVacation();
  })
  }

  countEmployees(){
    return this.employees.length.toString();
  }

  countEmployeesInVacation(){
    return this.employees.filter((employee) => employee.vacaciones).length.toString();
  }
}
