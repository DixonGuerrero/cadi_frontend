import { Component, OnInit, inject } from '@angular/core';
import { IEmployee } from '../../../../core/models/employee.interface';
import { IDepartment } from '../../../../core/models/departament.interface';
import { EmployeeService } from '../../../../core/services/admin/employee.service';
import { TokenService } from '../../../../core/services/auth/token.service';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { MessageService } from 'primeng/api';

export interface IDepartamentWithEmployees {
  id_departamento: number;
  nombreDepartamento: string;
  empleados: IEmployee[];
}

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [EmployeeCardComponent, ButtonModule, CarouselModule, TagModule,TooltipModule],
  templateUrl: './employees-page.component.html',
  styleUrl: './employees-page.component.css'
})
export class EmployeesPageComponent implements OnInit {
// Services
private employeeS = inject(EmployeeService);
private tokenS = inject(TokenService);
private departamentS = inject(DepartamentService);
private dialogService = inject(DialogService);
public messageService = inject(MessageService);

refCreateDialog: DynamicDialogRef | undefined;


responsiveOptions: any[] | undefined;

// Variables
public employees: IEmployee[] = [];
public departaments: IDepartment[] = [];
public departamentsWithEmployees: IDepartamentWithEmployees[] = [];

private subscriptions: Subscription = new Subscription();


ngOnInit(): void {
  this.initData();
  this.setupSubscriptions();
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

setupSubscriptions(): void {
  const createdSubscription = this.employeeS.employeeCreated$.subscribe((newEmployee) => {
    console.log('Nuevo empleado creado:', newEmployee);
    if(newEmployee){
      this.employees.push(newEmployee);
      this.departamentsWithEmployees = this.departamentsWithEmployees.map((departament) => {
        if (departament.id_departamento === newEmployee.departamento_Id) {
          departament.empleados.push(newEmployee);
        }
        return departament;
      });
    }
  });
  
  const updatedSubscription = this.employeeS.employeeUpdated$.subscribe((updatedEmployee) => {
    console.log('Empleado actualizado:', updatedEmployee);
    const index = this.employees.findIndex(d => d.id_Empleado === updatedEmployee.id_Empleado);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
      this.departamentsWithEmployees = this.departamentsWithEmployees.map((departament) => {
        return {
          id_departamento: departament.id_departamento,
          nombreDepartamento: departament.nombreDepartamento,
          empleados: departament.empleados.map((employee) => {
            if (employee.id_Empleado === updatedEmployee.id_Empleado) {
              return updatedEmployee;
            }
            return employee;
          }),
        };
      });
      
    }
  });

  const deletedSubscription = this.employeeS.employeeDeleted$.subscribe((deletedEmployeeId) => {
    console.log('Empleado eliminado con ID:', deletedEmployeeId);
    this.employees = this.employees.filter(d => d.id_Empleado !== deletedEmployeeId);
    this.departamentsWithEmployees = this.departamentsWithEmployees.map((departament) => {
      return {
        id_departamento: departament.id_departamento,
        nombreDepartamento: departament.nombreDepartamento,
        empleados: departament.empleados.filter((employee) => employee.id_Empleado !== deletedEmployeeId),
      };
    });
  });

  this.subscriptions.add(createdSubscription);
  this.subscriptions.add(updatedSubscription);
  this.subscriptions.add(deletedSubscription);
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
      id_departamento: departament.id_departamento,
      nombreDepartamento: departament.nombreDepartamento,
      empleados: this.employees.filter(
        (employee) => employee.departamento_Id === departament.id_departamento
      ),
    })) as unknown as IDepartamentWithEmployees[];
}

showCreateEmploye() {
  this.refCreateDialog = this.dialogService.open(EmployeeAddComponent, {
    header: ' Crear empleado',
    width: 'auto',
    height: 'auto',
    contentStyle: { overflow: 'auto', 'padding':'0'},
    breakpoints: {
      '960px': '75vw',
      '640px': '90vw',
    },

  });

  this.refCreateDialog.onClose.subscribe((data: any) => {});

  this.refCreateDialog.onMaximize.subscribe((value) => {
    this.messageService.add({
      severity: 'info',
      summary: 'Maximized',
      detail: `maximized: ${value.maximized}`,
    });
  });
}
}

