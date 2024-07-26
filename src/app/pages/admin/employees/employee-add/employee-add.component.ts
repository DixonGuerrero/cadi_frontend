import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDepartment, IEmployee } from '../../../../core/models/types';
import { EmployeeService } from '../../../../core/services/employee.service';
import { TokenService } from '../../../../core/services/token.service';
import { MessageService } from 'primeng/api';
import { DepartamentService } from '../../../../core/services/admin/departament.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent implements OnInit {
  departaments: IDepartment[] = [];

  constructor(
    private messageService : MessageService,
    private employeeS: EmployeeService,
    private tokenS: TokenService,
    private departamentService: DepartamentService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const idEmpresa = this.tokenS.getEmpresaId();

    this.departamentService
      .getDepartmentsByCompany()
      .subscribe((departaments) => {
        this.departaments = departaments;
      });
  }
  formNewEmployee = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    fecha_Nacimiento: new FormControl(''),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    fecha_Contratacion: new FormControl(''),
    puesto: new FormControl(''),
    salario: new FormControl(0),
    departamento_Id: new FormControl(0),
  });

  createEmployee() {
    console.log('Create employee', this.formNewEmployee.value);

    const newEmployee: IEmployee = this.getDataForm();

    this.employeeS.createEmployee(newEmployee).subscribe((response) => {
      console.log('Employee created', response);

      if (response === null || response === undefined) {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear empleado'});
        return;
      }

      if (!response.id_Empleado) {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear empleado'});
        return;
      }
      this.messageService.add({severity:'success', summary:'Success', detail:'Empleado creado con exito'});
      this.employeeS.updateEmployeesCache();

    });
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

  getDataForm(): IEmployee {
    const newEmployee: IEmployee = {
      nombre: this.formNewEmployee.value.nombre ?? '',
      apellido: this.formNewEmployee.value.apellido ?? '',
      fecha_Nacimiento: this.formNewEmployee.value.fecha_Nacimiento ?? '',
      direccion: this.formNewEmployee.value.direccion ?? '',
      telefono: this.formNewEmployee.value.telefono ?? '',
      email: this.formNewEmployee.value.email ?? '',
      fecha_Contratacion: this.formNewEmployee.value.fecha_Contratacion ?? '',
      puesto: this.formNewEmployee.value.puesto ?? '',
      salario: this.formNewEmployee.value.salario ?? 0,
      departamento_Id: this.formNewEmployee.value.departamento_Id ?? 0,
      estado: true,
      vacaciones: false,
      licencia: false,
    };

    return newEmployee;
  }
}
