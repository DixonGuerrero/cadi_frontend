import { Component, OnInit, inject } from '@angular/core';
import { IDepartment, IEmployee } from '../../../../core/models/types';
import { DepartamentService } from '../../../../core/services/departament.service';
import { TokenService } from '../../../../core/services/token.service';
import { EmployeeService } from '../../../../core/services/employee.service';

import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeCardComponent,EmployeeAddComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit{

    // Services
    private employeeS = inject(EmployeeService);
    private tokenS = inject(TokenService);
    private departamentS = inject(DepartamentService); 
  
    // Variables
    public employees: IEmployee[] = [];
    public departaments: IDepartment[] = [];
    public departamentsWithEmployees: IDepartment[] = [];

  
    ngOnInit(): void {
      this.initData();
    }


     initData() {
      this.employeeS.getEmployeesByCompany().subscribe(
        (employees) => {
          this.employees = employees;


          this.departamentS.getDepartmentsByCompany().subscribe(
            (departaments) => {
              this.departaments = departaments;
              this.filterDepartamentsWithEmployees();
            },
            (error) => {
              console.error('Error fetching departaments:', error);
            }
          );
          

        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );

      
    }

  

    filterDepartamentsWithEmployees() {
        this.departamentsWithEmployees = this.departaments.filter((departament) =>
          this.employees.some(
            (employee) =>
              departament.id_departamento === employee.departamento_Id
          )
        );
    }


}
