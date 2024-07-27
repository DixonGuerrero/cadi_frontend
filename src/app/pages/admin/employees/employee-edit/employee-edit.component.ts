import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDepartment } from '../../../../core/models/types';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { EmployeeService } from '../../../../core/services/admin/employee.service';
import { TokenService } from '../../../../core/services/auth/token.service';
import { IEmployee } from '../../../../core/models/employee.interface';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule, 
    MultiSelectModule, 
    DropdownModule,
    CalendarModule,
    InputNumberModule
  ],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  departaments: IDepartment[] = [];
  employee: IEmployee = {} as IEmployee;
  confirmationService = inject(ConfirmationService)


  imagePreview : string | ArrayBuffer | null = '';

  formEditEmployee = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    fecha_Nacimiento: new FormControl(),
    direccion: new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl(''),
    fecha_Contratacion: new FormControl(),
    puesto: new FormControl(''),
    salario: new FormControl(0),
    departamento: new FormControl<IDepartment[]>([]),
    imagen: new FormControl(''),
  });

  instance: DynamicDialogComponent | undefined;

  constructor(
    private employeeS: EmployeeService,
    private tokenS: TokenService,
    private departamentService: DepartamentService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public dialogService: DialogService
  ) {
    this.instance = this.dialogService.getInstance(ref);
  }

  ngOnInit(): void {
    this.employee = this.instance?.data.employee;
    this.initData();
  }

  initData() {
    this.departamentService.getDepartmentsByCompany().subscribe((departaments) => {
      this.departaments = departaments;
      this.initFormValues();
    });
  }

  private initFormValues() {
    const selectedDepartment = this.departaments.find(
      (departament) => departament.id_departamento === this.employee?.departamento_Id
    );

    this.formEditEmployee.patchValue({
      nombre: this.employee?.nombre ?? '',
      apellido: this.employee?.apellido ?? '',
      fecha_Nacimiento: this.formattedFechaNacimiento,
      direccion: this.employee?.direccion ?? '',
      telefono: this.employee?.telefono ?? '',
      email: this.employee?.email ?? '',
      fecha_Contratacion: this.formattedFechaContratacion,
      puesto: this.employee?.puesto ?? '',
      salario: this.employee?.salario ?? 0,
      departamento: selectedDepartment ? [selectedDepartment] : [], 
      imagen: this.employee?.imagen ?? '',
    });

    this.imagePreview = this.employee?.imagen ?? '';
  }


  onImageURLChange(): void {
    this.imagePreview = this.formEditEmployee.get('imagen')?.value ?? this.employee?.imagen ?? '';
  }

  editEmployee(event :  Event = new Event('')) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro de que quieres editar este empleado?',
      header: 'Confirmar Actualizacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-info p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",


      accept: () => {
        const editEmployee: IEmployee = this.getDataForm();

        console.log('Edit Employee:', editEmployee);
    
        this.employeeS.updateEmployee(editEmployee).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Empleado editado con éxito',
            });
            this.ref?.close();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al editar empleado',
            });
            console.error('Error editing Employee:', error);
          }
        ); 
    
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Haz cancelado la actualizacion' });
          this.ref?.close();
      }
  });
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

  getDataForm(): IEmployee {
    const editEmployee: IEmployee = {
      id_Empleado: this.employee?.id_Empleado ?? 0,
      nombre: this.formEditEmployee.value.nombre ?? '',
      apellido: this.formEditEmployee.value.apellido ?? '',
      fecha_Nacimiento: this.formatDate(this.formEditEmployee.value.fecha_Nacimiento),
      direccion: this.formEditEmployee.value.direccion ?? '',
      telefono: this.formEditEmployee.value.telefono ?? '',
      email: this.formEditEmployee.value.email ?? '',
      fecha_Contratacion: this.formatDate(this.formEditEmployee.value.fecha_Contratacion),
      puesto: this.formEditEmployee.value.puesto ?? '',
      salario: this.formEditEmployee.value.salario ?? 0,
      departamento_Id: this.formEditEmployee.value.departamento?.[0]?.id_departamento ?? 0,
      estado: this.employee?.estado ?? true,
      vacaciones: this.employee?.vacaciones ?? false,
      licencia: this.employee?.licencia ?? false,
      imagen: this.formEditEmployee.value.imagen ?? this.employee?.imagen,
    };
  
    return editEmployee;
  }
  
  formatDate(date: Date | null): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  get formattedFechaNacimiento(): string {
    const date = new Date(this.employee.fecha_Nacimiento);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  get formattedFechaContratacion(): string {
    const date = new Date(this.employee.fecha_Contratacion);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  onEmployeeCancel() {
    this.ref?.close();
  }
}
