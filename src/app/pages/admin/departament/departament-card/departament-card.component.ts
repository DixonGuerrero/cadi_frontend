import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { DepartamentEditComponent } from '../departament-edit/departament-edit.component';
import { initFlowbite } from 'flowbite';
import { DepartamentService } from '../../../../core/services/departament.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departament-card',
  standalone: true,
  imports: [DepartamentEditComponent],
  templateUrl: './departament-card.component.html',
  styleUrl: './departament-card.component.css'
})
export class DepartamentCardComponent implements OnInit {
   @Input()  departament:IDepartment = {
    descripcion:'',
    nombreDepartamento:'',
    id_departamento:0,
    empresa_Id:0

   }

   @Output() departamentDelete: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

   departamentService = inject(DepartamentService) 
   toastService = inject(ToastrService)


   ngOnInit(): void {
     initFlowbite()
   }

   handleEditDepartament(departament:IDepartment){
    this.departament = departament
   }



   handleDelete(){
   if(this.departament.id_departamento){
    this.departamentService.deleteDepartament(this.departament.id_departamento).subscribe((response) => {
      this.toastService.success("Departamento Eliminado")
      this.departamentService.updateDepartamentCache()
      this.departamentDelete.emit(this.departament)
    },
    (error) => {
      this.toastService.error('Error al editar licencia');
      console.error('Error editing License:', error);
    }
    )
   }

    
   }
}
