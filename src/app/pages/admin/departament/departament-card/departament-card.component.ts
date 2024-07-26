import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { DepartamentEditComponent } from '../departament-edit/departament-edit.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DepartamentService } from '../../../../core/services/admin/departament.service';


@Component({
  selector: 'app-departament-card',
  standalone: true,
  imports: [ButtonModule,],
  templateUrl: './departament-card.component.html',
  styleUrl: './departament-card.component.css'
})
export class DepartamentCardComponent {
   @Input()  departament:IDepartment = {
    descripcion:'',
    nombreDepartamento:'',
    id_departamento:0,
    empresa_Id:0

   }

   
  ref: DynamicDialogRef | undefined;


   @Output() departamentDelete: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

   departamentService = inject(DepartamentService) 
   confirmationService = inject(ConfirmationService)
   dialogService = inject(DialogService)
   messageService = inject(MessageService)



   handleEditDepartament(departament:IDepartment){
    this.departament = departament
   }

   



   editDepartament(){
    this.ref = this.dialogService.open(DepartamentEditComponent, {
      header: 'Editar Departamento',
      width: 'auto',
      height: 'auto',
      contentStyle: { overflow: 'auto', 'padding':'0'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        departament: this.departament,
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

   confirmDelete(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas seguro de eliminar este departamento?, si lo haces todos los empleados asociados a el desapareceran',
      header: 'Confirmar Eliminacion',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",


      accept: () => {
        if(this.departament.id_departamento){
          this.departamentService.deleteDepartament(this.departament.id_departamento).subscribe((response) => {
            this.messageService.add({
              severity:'success',
              summary:'Departamento eliminado',
              detail:'Departamento eliminado correctamente'
            })
          },
          (error) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Error al eliminar Departamento'})
            console.error('Error editing License:', error);
          }
          )
         }
      
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Haz cancelado la eliminacion' });
      }
  });
   }
}
