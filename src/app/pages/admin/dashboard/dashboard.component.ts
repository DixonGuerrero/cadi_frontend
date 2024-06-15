import { Component} from '@angular/core';
import { EmployeeCardComponent } from '../../../shared/components/employee-card/employee-card.component';
import { IEmployee } from '../../../core/models/types';
import { RouterLink } from '@angular/router';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EmployeeCardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent  {
  countEmployees = '35.000';
  countHoursWorked = '1.000.000';
  countEmployeesVacation = '5.000';
  

  constructor() {
   
  }

  employees: IEmployee[] = [
    {
      id_Empleado: 0,
      nombre: 'Carlos',
      apellido: 'Gómez',
      fecha_Nacimiento: '1980-03-15',
      direccion: 'Calle Principal 123',
      telefono: '555-1234',
      email: 'carlos.gomez@example.com',
      fecha_Contratacion: '2020-01-10',
      puesto: 'Gerente de Ventas',
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: true,
      departamento_Id: 1,
    },
    {
      id_Empleado: 1,
      nombre: 'Carlos',
      apellido: 'Gómez',
      fecha_Nacimiento: '1980-03-15',
      direccion: 'Calle Principal 123',
      telefono: '555-1234',
      email: 'carlos.gomez@example.com',
      fecha_Contratacion: '2020-01-10',
      puesto: 'Gerente de Ventas',
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: true,
      departamento_Id: 1,
    },
    {
      id_Empleado: 2,
      nombre: 'Carlos',
      apellido: 'Gómez',
      fecha_Nacimiento: '1980-03-15',
      direccion: 'Calle Principal 123',
      telefono: '555-1234',
      email: 'carlos.gomez@example.com',
      fecha_Contratacion: '2020-01-10',
      puesto: 'Gerente de Ventas',
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: true,
      departamento_Id: 1,
    },
    {
      id_Empleado: 3,
      nombre: 'Carlos',
      apellido: 'Gómez',
      fecha_Nacimiento: '1980-03-15',
      direccion: 'Calle Principal 123',
      telefono: '555-1234',
      email: 'carlos.gomez@example.com',
      fecha_Contratacion: '2020-01-10',
      puesto: 'Gerente de Ventas',
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: true,
      departamento_Id: 1,
    },
    {
      id_Empleado: 4,
      nombre: 'Carlos',
      apellido: 'Gómez',
      fecha_Nacimiento: '1980-03-15',
      direccion: 'Calle Principal 123',
      telefono: '555-1234',
      email: 'carlos.gomez@example.com',
      fecha_Contratacion: '2020-01-10',
      puesto: 'Gerente de Ventas',
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: true,
      departamento_Id: 1,
    },
    {
      id_Empleado: 5,
      nombre: 'Carlos',
      apellido: 'Gómez',
      fecha_Nacimiento: '1980-03-15',
      direccion: 'Calle Principal 123',
      telefono: '555-1234',
      email: 'carlos.gomez@example.com',
      fecha_Contratacion: '2020-01-10',
      puesto: 'Gerente de Ventas',
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: true,
      departamento_Id: 1,
    },
  ];


  

}
