import { Component, OnInit, inject } from '@angular/core';
import { IEmployee } from '../../../../core/models/types';
import { EmployeeCardComponent } from '../../../../shared/components/employee-card/employee-card.component';
import { initFlowbite } from 'flowbite';
import { TokenService } from '../../../../core/services/token.service';
import { DepartamentService } from '../../../../core/services/departament.service';
import { EmployeeService } from '../../../../core/services/employee.service';

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
