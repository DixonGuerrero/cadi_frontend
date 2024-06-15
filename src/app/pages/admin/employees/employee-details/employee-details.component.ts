import { Component, Input, signal } from '@angular/core';
import { IEmployee } from '../../../../core/models/types';
import { initFlowbite } from 'flowbite';
import { EmployeeCardComponent } from '../../../../shared/components/employee-card/employee-card.component';
import { VacationsAddComponent } from '../../vacations/vacations-add/vacations-add.component';
import { ModalService } from '../../../../core/services/modal.service';
import { HoursAddComponent } from '../../hours-worked/hours-add/hours-add.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [EmployeeCardComponent,VacationsAddComponent,HoursAddComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  hoursWorked = 12;
  nameEmployee = 'Juan Perez';
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


  
 
}
