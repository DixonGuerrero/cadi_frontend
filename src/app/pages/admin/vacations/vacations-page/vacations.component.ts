import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../../../core/models/types';
import { EmployeeCardComponent } from '../../../../shared/components/employee-card/employee-card.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-vacations',
  standalone: true,
  imports: [EmployeeCardComponent],
  templateUrl: './vacations.component.html',
  styleUrl: './vacations.component.css'
})
export class VacationsComponent {

  

  employees: IEmployee[] = [
    {
      id_Empleado: 0,
      nombre: "Carlos",
      apellido: "Gómez",
      fecha_Nacimiento: "1980-03-15",
      direccion: "Calle Principal 123",
      telefono: "555-1234",
      email: "carlos.gomez@example.com",
      fecha_Contratacion: "2020-01-10",
      puesto: "Gerente de Ventas",
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: false,
      departamento_Id: 1
    },
    {
      id_Empleado: 1,
      nombre: "María",
      apellido: "López",
      fecha_Nacimiento: "1975-08-20",
      direccion: "Avenida Central 456",
      telefono: "555-5678",
      email: "maria.lopez@example.com",
      fecha_Contratacion: "2019-05-05",
      puesto: "Analista de Datos",
      vacaciones: false,
      licencia: true,
      salario: 60000,
      estado: false,
      departamento_Id: 2
    },
    {
      id_Empleado: 2,
      nombre: "Pedro",
      apellido: "Martínez",
      fecha_Nacimiento: "1992-11-10",
      direccion: "Plaza Mayor 789",
      telefono: "555-9876",
      email: "pedro.martinez@example.com",
      fecha_Contratacion: "2020-10-15",
      puesto: "Asistente Administrativo",
      vacaciones: true,
      licencia: true,
      salario: 45000,
      estado: false,
      departamento_Id: 3
    },
    {
      id_Empleado: 3,
      nombre: "Ana",
      apellido: "Hernández",
      fecha_Nacimiento: "1988-06-25",
      direccion: "Calle Secundaria 321",
      telefono: "555-4321",
      email: "ana.hernandez@example.com",
      fecha_Contratacion: "2018-03-01",
      puesto: "Desarrollador Web",
      vacaciones: false,
      licencia: false,
      salario: 55000,
      estado: false,
      departamento_Id: 1
    },
    {
      id_Empleado: 4,
      nombre: "Luis",
      apellido: "Rodríguez",
      fecha_Nacimiento: "1995-02-12",
      direccion: "Ruta Norte 567",
      telefono: "555-8765",
      email: "luis.rodriguez@example.com",
      fecha_Contratacion: "2017-11-20",
      puesto: "Contador",
      vacaciones: true,
      licencia: false,
      salario: 65000,
      estado: false,
      departamento_Id: 2
    },
    {
      id_Empleado: 5,
      nombre: "Laura",
      apellido: "Sánchez",
      fecha_Nacimiento: "1983-09-30",
      direccion: "Avenida Sur 987",
      telefono: "555-2468",
      email: "laura.sanchez@example.com",
      fecha_Contratacion: "2016-04-12",
      puesto: "Recursos Humanos",
      vacaciones: false,
      licencia: true,
      salario: 50000,
      estado: false,
      departamento_Id: 3
    },
    {
      id_Empleado: 6,
      nombre: "Carlos",
      apellido: "Gómez",
      fecha_Nacimiento: "1980-03-15",
      direccion: "Calle Principal 123",
      telefono: "555-1234",
      email: "carlos.gomez@example.com",
      fecha_Contratacion: "2020-01-10",
      puesto: "Gerente de Ventas",
      vacaciones: true,
      licencia: false,
      salario: 70000,
      estado: false,
      departamento_Id: 1
    },
    {
      id_Empleado: 7,
      nombre: "María",
      apellido: "López",
      fecha_Nacimiento: "1975-08-20",
      direccion: "Avenida Central 456",
      telefono: "555-5678",
      email: "maria.lopez@example.com",
      fecha_Contratacion: "2019-05-05",
      puesto: "Analista de Datos",
      vacaciones: false,
      licencia: true,
      salario: 60000,
      estado: false,
      departamento_Id: 2
    },
    {
      id_Empleado: 8,
      nombre: "Pedro",
      apellido: "Martínez",
      fecha_Nacimiento: "1992-11-10",
      direccion: "Plaza Mayor 789",
      telefono: "555-9876",
      email: "pedro.martinez@example.com",
      fecha_Contratacion: "2020-10-15",
      puesto: "Asistente Administrativo",
      vacaciones: true,
      licencia: true,
      salario: 45000,
      estado: false,
      departamento_Id: 3
    },
    {
      id_Empleado: 9,
      nombre: "Ana",
      apellido: "Hernández",
      fecha_Nacimiento: "1988-06-25",
      direccion: "Calle Secundaria 321",
      telefono: "555-4321",
      email: "ana.hernandez@example.com",
      fecha_Contratacion: "2018-03-01",
      puesto: "Desarrollador Web",
      vacaciones: false,
      licencia: false,
      salario: 55000,
      estado: false,
      departamento_Id: 1
    },
    {
      id_Empleado: 10,
      nombre: "Luis",
      apellido: "Rodríguez",
      fecha_Nacimiento: "1995-02-12",
      direccion: "Ruta Norte 567",
      telefono: "555-8765",
      email: "luis.rodriguez@example.com",
      fecha_Contratacion: "2017-11-20",
      puesto: "Contador",
      vacaciones: true,
      licencia: false,
      salario: 65000,
      estado: false,
      departamento_Id: 2
    },
    {
      id_Empleado: 11,
      nombre: "Laura",
      apellido: "Sánchez",
      fecha_Nacimiento: "1983-09-30",
      direccion: "Avenida Sur 987",
      telefono: "555-2468",
      email: "laura.sanchez@example.com",
      fecha_Contratacion: "2016-04-12",
      puesto: "Recursos Humanos",
      vacaciones: false,
      licencia: true,
      salario: 50000,
      estado: false,
      departamento_Id: 3
    }
  ];
}