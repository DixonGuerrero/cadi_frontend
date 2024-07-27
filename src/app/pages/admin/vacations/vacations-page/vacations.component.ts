import { Component, OnInit, inject } from '@angular/core';
import { IEmployee } from '../../../../core/models/types';
import { TokenService } from '../../../../core/services/auth/token.service';import { EmployeeCardComponent } from '../../employees/employee-card/employee-card.component';
import { EmployeeService } from '../../../../core/services/admin/employee.service';

@Component({
  selector: 'app-vacations',
  standalone: true,
  imports: [EmployeeCardComponent],
  templateUrl: './vacations.component.html',
  styleUrl: './vacations.component.css'
})
export class VacationsComponent implements OnInit{
  // Services
  private employeeS = inject(EmployeeService);

  // Variables
  employees: IEmployee[] = [];

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.employeeS.getEmployeesByCompany().subscribe((employees) => {
      this.employees = employees;
      
      this.employees = this.filterEmployeeInVacation(this.employees);

    });
  }

  filterEmployeeInVacation(employees: IEmployee[]){
    return employees.filter((employee) => employee.vacaciones);
  }
}
