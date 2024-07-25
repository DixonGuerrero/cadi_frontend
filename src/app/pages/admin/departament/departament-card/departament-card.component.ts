import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { DepartamentEditComponent } from '../departament-edit/departament-edit.component';
import { DepartamentService } from '../../../../core/services/departament.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-departament-card',
  standalone: true,
  imports: [DepartamentEditComponent],
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

   @Output() departamentDelete: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

   departamentService = inject(DepartamentService) 
   messageServive = inject(MessageService)



   handleEditDepartament(departament:IDepartment){
    this.departament = departament
   }



   handleDelete(){
   if(this.departament.id_departamento){
    this.departamentService.deleteDepartament(this.departament.id_departamento).subscribe((response) => {
      this.messageServive.add({
        severity:'success',
        summary:'Departamento eliminado',
        detail:'Departamento eliminado correctamente'
      })
      this.departamentService.updateDepartamentCache()
      this.departamentDelete.emit(this.departament)
    },
    (error) => {
      this.messageServive.add({severity:'error', summary:'Error', detail:'Error al eliminar Departamento'})
      console.error('Error editing License:', error);
    }
    )
   }

    
   }
}
