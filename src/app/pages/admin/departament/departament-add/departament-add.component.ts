import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../../../core/services/token.service';
import { DepartamentService } from '../../../../core/services/departament.service';
import { IDepartment } from '../../../../core/models/types';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-departament-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './departament-add.component.html',
  styleUrl: './departament-add.component.css'
})
export class DepartamentAddComponent implements OnInit {

  @Output() departamentAdd: EventEmitter<IDepartment> = new EventEmitter<IDepartment>();

  tokenService = inject(TokenService)
  departamentService = inject(DepartamentService)
  messageService = inject(MessageService)

  formNewDepartament = new FormGroup({
    nombreDepartament: new FormControl(''),
    descripcion : new FormControl('')
  })

  ngOnInit(): void {
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
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear Departamento'});
          return;
        }
  
        if (!response.id_departamento) {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear Departamento'});
          return;
        }

        this.departamentAdd.emit(response)
        this.messageService.add({severity:'success', summary:'Success', detail:'Departamento creado con exito'});
        this.departamentService.updateDepartamentCache();
  
      });

  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
