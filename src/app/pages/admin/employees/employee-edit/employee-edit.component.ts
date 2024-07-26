import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDepartment, IEmployee } from '../../../../core/models/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee.service';
import { TokenService } from '../../../../core/services/token.service';
import { MessageService } from 'primeng/api';
import { DepartamentService } from '../../../../core/services/admin/departament.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css',
})
export class EmployeeEditComponent {
  departaments: IDepartment[] = [];

  @Input() employee: IEmployee | undefined;
  @Output() employeeEdited: EventEmitter<IEmployee> =
    new EventEmitter<IEmployee>();
  formEditEmployee = new FormGroup({
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
  constructor(
    private employeeS: EmployeeService,
    private tokenS: TokenService,
    private departamentService: DepartamentService,
    private messageService : MessageService
  ) {}

  ngOnInit(): void {
    this.initData();
    this.initFormValues();
  }

  initData() {


    this.departamentService
      .getDepartmentsByCompany()
      .subscribe((departaments) => {
        this.departaments = departaments;
      });
  }
  private initFormValues() {
    this.formEditEmployee.patchValue({
      nombre: this.employee?.nombre ?? '',
      apellido: this.employee?.apellido ?? '',
      fecha_Nacimiento: this.employee?.fecha_Nacimiento.toString(),
      direccion: this.employee?.direccion ?? '',
      telefono: this.employee?.telefono ?? '',
      email: this.employee?.email ?? '',
      fecha_Contratacion: this.employee?.fecha_Contratacion.toString(),
      puesto: this.employee?.puesto ?? '',
      salario: this.employee?.salario ?? 0,
      departamento_Id: this.employee?.departamento_Id ?? 0
    });
  }

  editEmployee() {
    

    const editEmployee: IEmployee = this.getDataForm();

    this.employeeS.updateEmployee(editEmployee).subscribe(
      (response) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Empleado editado con éxito'});  
        this.employeeEdited.emit(editEmployee);
        this.employeeS.updateEmployeesCache();
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al editar empleado'});
        console.error('Error editing Employee:', error);
      }
    );
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

  getDataForm(): IEmployee {
    const editEmployee: IEmployee = {
      id_Empleado: this.employee?.id_Empleado ?? 0,
      nombre: this.formEditEmployee.value.nombre ?? '',
      apellido: this.formEditEmployee.value.apellido ?? '',
      fecha_Nacimiento: this.formEditEmployee.value.fecha_Nacimiento ?? '',
      direccion: this.formEditEmployee.value.direccion ?? '',
      telefono: this.formEditEmployee.value.telefono ?? '',
      email: this.formEditEmployee.value.email ?? '',
      fecha_Contratacion: this.formEditEmployee.value.fecha_Contratacion ?? '',
      puesto: this.formEditEmployee.value.puesto ?? '',
      salario: this.formEditEmployee.value.salario ?? 0,
      departamento_Id: this.formEditEmployee.value.departamento_Id ?? 0,
      estado: this.employee?.estado ?? true,
      vacaciones: this.employee?.vacaciones ?? false,
      licencia: this.employee?.licencia ?? false,
    };

    return editEmployee;
  }
}
