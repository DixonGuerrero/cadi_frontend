<<<<<<< HEAD
import { Component, OnInit, inject } from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IEmployee } from '../../../../core/models/employee.interface';
import { IDepartment } from '../../../../core/models/departament.interface';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { CommonModule } from '@angular/common';
import { MenuItem, MessageService } from 'primeng/api';
import { SpeedDial, SpeedDialModule } from 'primeng/speeddial';
=======
import { AfterViewInit, Component, Input, OnInit, signal } from '@angular/core';
import { IEmployee } from '../../../../core/models/types';
import { initFlowbite } from 'flowbite';
import { EmployeeCardComponent } from '../../../../shared/components/employee-card/employee-card.component';
import { VacationsAddComponent } from '../../vacations/vacations-add/vacations-add.component';
import { HoursAddComponent } from '../../hours-worked/hours-add/hours-add.component';
import { LicenseAddComponent } from '../../license/license-add/license-add.component';
import { CommonModule } from '@angular/common';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

@Component({
  selector: 'app-employee-details',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule,SpeedDialModule],
=======
  imports: [EmployeeCardComponent,VacationsAddComponent,HoursAddComponent, LicenseAddComponent, CommonModule,EmployeeEditComponent],
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{
<<<<<<< HEAD

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
  
  photo = 'images/admin.jpg';

  employee: IEmployee = {
=======
  hoursWorked = 12;
  departament = 'Software Development';
  timeServide = 0;
  photo = 'images/employee.jpg';

  openModalVacations = signal<boolean>(false);


  ngOnInit(): void {
    initFlowbite();
    this.calculateTimeService();
    this.formatFecha();
    
  }

  

  @Input() employee: IEmployee = {
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
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
<<<<<<< HEAD
    salario: 0,
    estado: true,
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
=======
    salario:  0,
    estado: true,
    departamento_Id: 0,
  };
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

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
<<<<<<< HEAD
  
=======

  
 
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
}
