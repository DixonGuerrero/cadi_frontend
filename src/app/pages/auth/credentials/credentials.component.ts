import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../../core/services/company.service';
import { DepartamentService } from '../../../core/services/departament.service';
import { EmployeeService } from '../../../core/services/employee.service';
import {
  ICompany,
  IDepartment,
  IEmployee,
  IUsuario,
  Rol,
} from '../../../core/models/types';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.css',
})
export class CredentialsComponent implements OnInit {
  username = '';
  password = '';

  companyCreated: ICompany | null = null;
  private companySuscription: Subscription = new Subscription();

  departamentCreated: IDepartment | null = null;
  private departamentSuscription: Subscription = new Subscription();

  createdEmployee: IEmployee | null = null;

  companyService = inject(CompanyService);
  departamentService = inject(DepartamentService);
  employeeService = inject(EmployeeService);
  toastrService = inject(ToastrService);
  authS = inject(AuthService);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.companySuscription = this.companyService.companyCreated$.subscribe(company => {
      this.companyCreated = company;
        

        console.log('Company:', this.companyCreated)

        this.departamentSuscription =
          this.departamentService.departamentCreated$.subscribe(
            (departament) => {
              this.departamentCreated = departament;
              console.log('Departament:', this.departamentCreated)
              this.generateCredentials()
            }
          );
      }
    );
  }

  ngOnDestroy(): void {
    this.companySuscription.unsubscribe();
    this.departamentSuscription.unsubscribe();
  }

  generateCredentials() {
    this.generateUsername();
    this.generatePassword();

    const empleadoSuperAdmin: IEmployee = {
      nombre: 'Super Admin',
      apellido: 'Super Admin',
      email: this.companyCreated?.email ?? '',
      telefono: this.companyCreated?.telefono ?? '',
      departamento_Id: this.departamentCreated?.id_departamento ?? 1,
      puesto: 'Super Admin',
      salario: 0,
      estado: true,
      vacaciones: false,
      licencia: false,
      fecha_Nacimiento: format(new Date(), 'yyyy-MM-dd'),
      direccion: this.companyCreated?.direccion ?? '',
      fecha_Contratacion: format(new Date(), 'yyyy-MM-dd'),
    };

    console.log('Empleado:', empleadoSuperAdmin);

    this.employeeService.createEmployee(empleadoSuperAdmin).subscribe(
      (response) => {
        this.createdEmployee = response;
        console.log('Employee created:', this.createdEmployee);
        this.toastrService.success('Empleado creado');

        this.generateUser();
      },
      (error) => {
        console.error('Error creating Employee:', error);
        this.toastrService.error('Error al crear empleado');
      }
    );

  }

  generateUser() {
    const rol: Rol = 'SuperAdmin';

    const userSuperAdmin: IUsuario = {
      nombre_usuario: this.username,
      contrasena: this.password,
      rol: rol,
      empleado_Id: this.createdEmployee?.id_Empleado ?? 1,
    };

    console.log('Usuario:', userSuperAdmin);

    this.authS.register(userSuperAdmin).subscribe(
      (response) => {
        console.log('User created:', response);
        this.toastrService.success('Usuario creado');
      },
      (error) => {
        console.error('Error creating User:', error);
        this.toastrService.error('Error al crear usuario');
      }
    );

  }

  generateUsername() {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = this.companyCreated?.nombreEmpresa ?? '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      username += characters[randomIndex];
    }
    this.username = username;
  }

  generatePassword() {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    this.password = password;
  }

  onCopy() {
    this.toastrService.success('Credenciales copiadas al portapapeles.');
  }
}
