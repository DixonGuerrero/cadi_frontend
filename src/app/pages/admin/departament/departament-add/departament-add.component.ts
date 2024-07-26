import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../../core/services/token.service';
import { IDepartment } from '../../../../core/models/types';
import { MessageService } from 'primeng/api';
import { DepartamentService } from '../../../../core/services/admin/departament.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-departament-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './departament-add.component.html',
  styleUrl: './departament-add.component.css',
})
export class DepartamentAddComponent implements OnInit {
  @Output() departamentAdd: EventEmitter<IDepartment> =
    new EventEmitter<IDepartment>();

  tokenService = inject(TokenService);
  departamentService = inject(DepartamentService);
  messageService = inject(MessageService);

  formNewDepartament = new FormGroup({
    nombreDepartament: new FormControl(''),
    descripcion: new FormControl(''),
  });

  instance: DynamicDialogComponent | undefined;

  constructor(
    public ref: DynamicDialogRef,
    public dialogService: DialogService
  ) {
    this.instance = this.dialogService.getInstance(ref);
  }

  ngOnInit(): void {}

  createDepartament() {
    const idEmpresa = this.tokenService.getEmpresaId();

    const dataDepartament: IDepartment = {
      descripcion: this.formNewDepartament.value.descripcion ?? '',
      nombreDepartamento: this.formNewDepartament.value.nombreDepartament ?? '',
      empresa_Id: idEmpresa,
    };

    this.departamentService.createDepartament(dataDepartament).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Departamento creado con exito',
        });
        this.ref?.close();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al crear Departamento',
        });
        console.error('Error creating Departament:', error);
      }
    );
  }

  onCancel() {
    this.ref?.close();
  }
}
