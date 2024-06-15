import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../../core/models/types';
import { EmployeeCardComponent } from '../../../shared/components/employee-card/employee-card.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { SearchService } from '../../../core/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [EmployeeCardComponent,NavBarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchTerm = '';

  private searchSubscription: Subscription = new Subscription();


  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;

      console.log('ESTE ES EL TERMINO DE BUSQUEDA', this.searchTerm)

    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


  results: IEmployee[] = [
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
      estado: true,
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
      estado: true,
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
      estado: true,
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
      estado: true,
      departamento_Id: 2
    }
  ];
}
