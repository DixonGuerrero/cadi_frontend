import { AfterViewInit, Component, Input, OnInit, signal } from '@angular/core';
import { IEmployee } from '../../../../core/models/types';
import { initFlowbite } from 'flowbite';
import { EmployeeCardComponent } from '../../../../shared/components/employee-card/employee-card.component';
import { VacationsAddComponent } from '../../vacations/vacations-add/vacations-add.component';
import { HoursAddComponent } from '../../hours-worked/hours-add/hours-add.component';
import { LicenseAddComponent } from '../../license/license-add/license-add.component';
import { CommonModule } from '@angular/common';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [EmployeeCardComponent,VacationsAddComponent,HoursAddComponent, LicenseAddComponent, CommonModule,EmployeeEditComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit{
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
    salario:  0,
    estado: true,
    departamento_Id: 0,
  };

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
