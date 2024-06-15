import { Component, Input, OnInit, signal } from '@angular/core';
import { IEmployee } from '../../../core/models/types';
import { initFlowbite } from 'flowbite';
import { EmployeeDetailsComponent } from '../../../pages/admin/employees/employee-details/employee-details.component';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [EmployeeDetailsComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
})
export class EmployeeCardComponent implements OnInit{
  hoursWorked = 12;
  nameEmployee = 'Juan Perez';
  departament = 'Software Development';
  timeServide = 0;
  photo = 'images/employee.jpg';
  details = signal<Boolean>(false)

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
