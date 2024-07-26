import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { DepartamentService } from '../../../../core/services/admin/departament.service';

@Component({
  selector: 'app-departament-edit',
  standalone: true,
  imports: [ReactiveFormsModule,ButtonModule,InputTextModule,InputTextareaModule],
  templateUrl: './departament-edit.component.html',
  styleUrl: './departament-edit.component.css'
})
export class DepartamentEditComponent implements OnInit , AfterViewInit{
  departament: IDepartment = {} as IDepartment;

   
  instance: DynamicDialogComponent | undefined;

  constructor(public ref: DynamicDialogRef, public dialogService : DialogService ){
    this.instance = this.dialogService.getInstance(ref)
  }



   @Output() departamentEdited: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

   departamentService = inject(DepartamentService)
   messageService = inject(MessageService)
   confirmationService = inject(ConfirmationService)

   ngOnInit(): void {
    this.departament = this.instance?.data[
      'departament'
    ];

    console.log('Departament:', this.departament);  
     this.initFormValues()
   }

   ngAfterViewInit(): void {
   }

   departementForm = new FormGroup({
    descripcion:new FormControl(''),
    nombreDepartamento:new FormControl(''),
  });

  private initFormValues() {
    this.departementForm.patchValue({
      descripcion:this.departament.descripcion.toString(),
      nombreDepartamento:this.departament.nombreDepartamento.toString(),
    });
  }

  confirmDelete(event: Event){
    
   }

  onDepartamentEdit(event: Event = new Event('')){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro de que quieres editar este departamento?',
      header: 'Confirmar Actualizacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-info p-button-text",
      rejectButtonStyleClass:"p-button-danger p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",


      accept: () => {
        const departamentEditData: IDepartment = {
      
          id_departamento: this.departament.id_departamento,
          empresa_Id: this.departament.empresa_Id,
          descripcion: this.departementForm.value.descripcion ?? this.departament.descripcion,
          nombreDepartamento: this.departementForm.value.nombreDepartamento ?? this.departament.nombreDepartamento
        };
    
        console.log('Departament edited:', departamentEditData);
    
        this.departamentService.updateDepartament(departamentEditData).subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Departamento editado',
              detail: 'Departamento editado correctamente',
            });
            console.log('License edited:', response);
            this.departament = departamentEditData;
            this.ref?.close();
    
            this.departamentEdited.emit(this.departament);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al editar Departamento',
            });
            console.error('Error editing License:', error);
          }
        );
    
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Haz cancelado la actualizacion' });
          this.ref?.close();
      }
  });
    
  }

  onDepartamentCancel(){
    this.ref?.close();
    
  }

}
