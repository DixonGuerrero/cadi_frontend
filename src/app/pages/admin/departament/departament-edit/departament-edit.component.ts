import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../../core/services/modal.service';
import { DepartamentService } from '../../../../core/services/departament.service';

@Component({
  selector: 'app-departament-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './departament-edit.component.html',
  styleUrl: './departament-edit.component.css'
})
export class DepartamentEditComponent implements OnInit , AfterViewInit{
  @Input() departament:IDepartment = {
    descripcion:'',
    nombreDepartamento:'',
    id_departamento:0,
    empresa_Id:0

   }



   @Output() departamentEdited: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

   departamentService = inject(DepartamentService)
   toastrSvc = inject(ToastrService);
   modalService = inject(ModalService);

   ngOnInit(): void {
     this.initFormValues()
   }

   ngAfterViewInit(): void {
     this.modalService.initModal('departament-modal-edit' + this.departament.id_departamento)
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

  onDepartamentEdit(){
    const departamentEditData: IDepartment = {
      
      id_departamento: this.departament.id_departamento,
      empresa_Id: this.departament.empresa_Id,
      descripcion: this.departementForm.value.descripcion ?? this.departament.descripcion,
      nombreDepartamento: this.departementForm.value.nombreDepartamento ?? this.departament.nombreDepartamento
    };

    console.log('Departament edited:', departamentEditData);

    this.departamentService.updateDepartament(departamentEditData).subscribe(
      (response) => {
        this.toastrSvc.success('Licencia editada');
        console.log('License edited:', response);
        this.departament = departamentEditData;

        this.departamentEdited.emit(this.departament);
      },
      (error) => {
        this.toastrSvc.error('Error al editar licencia');
        console.error('Error editing License:', error);
      }
    );

    
  }

  
  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
