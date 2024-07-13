<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit, inject } from '@angular/core';
import { EmployeeCardComponent } from '../../../shared/components/employee-card/employee-card.component';
import { IDepartment, IEmployee } from '../../../core/models/types';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { TokenService } from '../../../core/services/token.service';
import { DepartamentService } from '../../../core/services/departament.service';
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

@Component({
  selector: 'app-dashboard',
  standalone: true,
<<<<<<< HEAD
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

=======
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
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
}
