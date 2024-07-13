import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../../core/models/employee.interface';
import { IDepartment } from '../../../../core/models/departament.interface';
import { EmployeeService } from '../../../../core/services/admin/employee.service';
import { TokenService } from '../../../../core/services/auth/token.service';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [EmployeeCardComponent, ButtonModule, CarouselModule, TagModule],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css'
})
export class EmployeesPageComponent {
// Services
private employeeS = inject(EmployeeService);
private tokenS = inject(TokenService);
private departamentS = inject(DepartamentService);


responsiveOptions: any[] | undefined;

// Variables
public employees: IEmployee[] = [];
public departaments: IDepartment[] = [];
public departamentsWithEmployees: any=[];


ngOnInit(): void {
  this.initData();

  this.responsiveOptions = [
    {
        breakpoint: '1000px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
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
  this.departamentsWithEmployees = this.departaments
    .filter((departament) =>
      this.employees.some(
        (employee) =>
          departament.id_departamento === employee.departamento_Id
      )
    )
    .map((departament) => ({
      nombreDepartamento: departament.nombreDepartamento,
      empleados: this.employees.filter(
        (employee) => employee.departamento_Id === departament.id_departamento
      ),
    }));
}
}

