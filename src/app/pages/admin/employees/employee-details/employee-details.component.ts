import { Component, OnInit, inject } from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEmployee } from '../../../../core/models/employee.interface';
import { IDepartment } from '../../../../core/models/departament.interface';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDial, SpeedDialModule } from 'primeng/speeddial';
import { VacationsAddComponent } from '../../vacations/vacations-add/vacations-add.component';
import { HoursAddComponent } from '../../hours-worked/hours-add/hours-add.component';
import { LicenseAddComponent } from '../../license/license-add/license-add.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule,SpeedDialModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{

  departamentService = inject(DepartamentService);
  messageService = inject(MessageService);

  hoursWorked = 12;
  departament : IDepartment = {
    nombreDepartamento: '',
    descripcion: '',
    empresa_Id: 0,
  }
  timeServide = 0;

  items: MenuItem[] | undefined;

  employee: IEmployee = {
    id_Empleado: 0,
    nombre: '',
    apellido: '',
    fecha_Nacimiento: '',
    direccion: '',
    telefono: '',
    email: '',
    fecha_Contratacion: '',
    puesto: '',
    vacaciones: false,
    licencia: false,
    salario: 0,
    estado: true,
    imagen: '',
    departamento_Id: 0,
  }


  instance: DynamicDialogComponent | undefined;

  constructor(public ref: DynamicDialogRef, public dialogService : DialogService ) {
    this.instance = this.dialogService.getInstance(ref)
   }

  ngOnInit(): void {
    this.employee = this.instance?.data[
      'employee'
    ];
    this.loadDataDepartament();
    this.calculateTimeService();
    this.formatFecha();

    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
              this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      },
      {
          icon: 'pi pi-upload',
          routerLink: ['/fileupload']
      },
      {
          icon: 'pi pi-external-link',
          target: '_blank',
          url: 'http://angular.io'
      }
  ];
  }

  loadDataDepartament() {
    this.departamentService.getDepartament(this.employee.departamento_Id).subscribe((data) => {
      this.departament = data.resultado as IDepartment;
  })
  }

  calculateTimeService() {
    const currentDate = new Date();
    const hireDate = new Date(this.employee.fecha_Contratacion);
    const timeService = currentDate.getFullYear() - hireDate.getFullYear();
    this.timeServide = timeService;
  }

  formatFecha() {
    const date = new Date(this.employee.fecha_Nacimiento);
    this.employee.fecha_Nacimiento = date.toLocaleDateString();
  }

  handleUpdateEmployee(employee: IEmployee) {
    this.employee = employee;
  }
  
}
