import { Component, Input, inject, signal } from '@angular/core';
import { IEmployee } from '../../../../core/models/employee.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { IDepartment } from '../../../../core/models/departament.interface';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css',
})
export class EmployeeCardComponent {
  //Inyeccion de dependencias
  dialogService = inject(DialogService);
  messageService = inject(MessageService);
  departamentService = inject(DepartamentService);

  hoursWorked = 12;
  nameEmployee = '';
  departament : IDepartment = {
    nombreDepartamento: '',
    descripcion: '',
    empresa_Id: 0,
  };
  timeServide = 0;
  photo = 'images/admin.jpg';
  details = signal<Boolean>(false);

  ngOnInit(): void {
    this.loadDataDepartament();
    this.calculateTimeService();
    this.formatFecha();
  }

  loadDataDepartament() {
    this.departamentService.getDepartament(this.employee.departamento_Id).subscribe((data) => {
      this.departament = data.resultado as IDepartment;
    })
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
    salario: 0,
    estado: true,
    imagen: '',
    departamento_Id: 0,
  };

  ref: DynamicDialogRef | undefined;

  show() {
    this.ref = this.dialogService.open(EmployeeDetailsComponent, {
      header: 'Detalles Empleados',
      width: 'auto',
      height: 'auto',
      contentStyle: { overflow: 'auto', 'padding':'0'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        employee: this.employee,
      }
    });

    this.ref.onClose.subscribe((data: any) => {});

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  calculateTimeService() {
    const currentDate = new Date();

    const hireDate = new Date(this.employee.fecha_Contratacion);
    const timeService = currentDate.getFullYear() - hireDate.getFullYear();
    this.timeServide = timeService ?? 0;
  }

  formatFecha() {
    const date = new Date(this.employee.fecha_Nacimiento);
    const formattedDate = date.toLocaleDateString();
  }
}
