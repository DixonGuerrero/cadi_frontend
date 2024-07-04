import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal.service';
import { TokenService } from '../../../../core/services/token.service';
import { DepartamentService } from '../../../../core/services/departament.service';
import { IDepartment } from '../../../../core/models/types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departament-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './departament-add.component.html',
  styleUrl: './departament-add.component.css'
})
export class DepartamentAddComponent implements OnInit {

  @Output() departamentAdd: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

  modalService = inject(ModalService)
  tokenService = inject(TokenService)
  departamentService = inject(DepartamentService)
  toast = inject(ToastrService)

  formNewDepartament = new FormGroup({
    nombreDepartament: new FormControl(''),
    descripcion : new FormControl('')
  })

  ngOnInit(): void {
    this.modalService.initModal("modal-create-departament")
  }


  createDepartament(){
      const idEmpresa = this.tokenService.getEmpresaId()

      const dataDepartament:IDepartment = {
        descripcion: this.formNewDepartament.value.descripcion ?? '',
        nombreDepartamento: this.formNewDepartament.value.nombreDepartament ?? '',
        empresa_Id: idEmpresa
      }

      
      this.departamentService.createDepartament(dataDepartament).subscribe((response) => {
        console.log('Departament created', response);

        response =  response as IDepartment
  
        if (response === null || response === undefined) {
          this.toast.error('Error al crear Departamento');
          return;
        }
  
        if (!response.id_departamento) {
          this.toast.error('Error al crear Departamento');
          return;
        }

        this.departamentAdd.emit(response)
  
        this.toast.success('Departamento creado correctamente');
        this.departamentService.updateDepartamentCache();
  
        this.modalService.hideModal();
      });

  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
