import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { IDepartment } from '../../../../core/models/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentService } from '../../../../core/services/departament.service';
import { MessageService } from 'primeng/api';

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
   messageService = inject(MessageService)

   ngOnInit(): void {
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
        this.messageService.add({
          severity: 'success',
          summary: 'Departamento editado',
          detail: 'Departamento editado correctamente',
        });
        console.log('License edited:', response);
        this.departament = departamentEditData;

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

    
  }

  
  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
