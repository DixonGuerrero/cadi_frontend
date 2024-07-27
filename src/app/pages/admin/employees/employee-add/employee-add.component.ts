import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDepartment } from '../../../../core/models/types';
import { EmployeeService } from '../../../../core/services/admin/employee.service';
import { TokenService } from '../../../../core/services/auth/token.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { ButtonModule } from 'primeng/button';
import { IEmployee } from '../../../../core/models/employee.interface';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    MultiSelectModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
  ],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent implements OnInit {
  departaments: IDepartment[] = [];
  imagePreview: string | ArrayBuffer = '';
  instance: DynamicDialogComponent | undefined;

  constructor(
    private messageService: MessageService,
    private employeeS: EmployeeService,
    private tokenS: TokenService,
    private departamentService: DepartamentService,
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService
  ) {
    this.instance = this.dialogService.getInstance(ref);
  }

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

  createEmployee(event: Event = new Event('')) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro de que quieres crear este empleado?',
      header: 'Confirmar Creacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-info p-button-text',
      rejectButtonStyleClass: 'p-button-danger p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        const newEmployee: IEmployee = this.getDataForm();

        this.employeeS.createEmployee(newEmployee).subscribe((response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Empleado creado con exito',
          });
          this.ref?.close();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: 'Haz cancelado la creacion',
        });
        this.ref?.close();
      },
    });
  }

  onImageUrlChange() {
    const image = this.formNewEmployee.value.imagen;
    if (image) this.imagePreview = image;
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

  getDataForm(): IEmployee {
    const editEmployee: IEmployee = {
      nombre: this.formNewEmployee.value.nombre ?? '',
      apellido: this.formNewEmployee.value.apellido ?? '',
      fecha_Nacimiento: this.formatDate(
        this.formNewEmployee.value.fecha_Nacimiento
      ),
      direccion: this.formNewEmployee.value.direccion ?? '',
      telefono: this.formNewEmployee.value.telefono ?? '',
      email: this.formNewEmployee.value.email ?? '',
      fecha_Contratacion: this.formatDate(
        this.formNewEmployee.value.fecha_Contratacion
      ),
      puesto: this.formNewEmployee.value.puesto ?? '',
      salario: this.formNewEmployee.value.salario ?? 0,
      departamento_Id:
        this.formNewEmployee.value.departamento?.[0]?.id_departamento ?? 0,
      estado: true,
      vacaciones: false,
      licencia: false,
      imagen: this.formNewEmployee.value.imagen ?? '',
    };

    return editEmployee;
  }

  formatDate(date: Date | null): string {
    console.log('Date:', date);
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  onCancelCreate() {
    this.ref?.close();
  }
}
