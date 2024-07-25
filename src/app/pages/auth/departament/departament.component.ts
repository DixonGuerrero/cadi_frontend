import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ICompany, IDepartment } from '../../../core/models/types';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../../core/services/company.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentService } from '../../../core/services/departament.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-departament',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './departament.component.html',
  styleUrl: './departament.component.css'
})
export class DepartamentComponent {
  companyCreated:ICompany | null = null;
  private companySuscription: Subscription = new Subscription();
  private departamentService = inject(DepartamentService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  resultDepartamentCreated: IDepartment | any;

  formRegisterDepartament = new FormGroup({
    nombreDepartamento: new FormControl(''),
    descripcion: new FormControl(''),
  });

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companySuscription = this.companyService.companyCreated$.subscribe(company => {
      this.companyCreated = company;

      console.log('ESTE ES EL TERMINO DE BUSQUEDA', this.companyCreated)

    });
  }

  ngOnDestroy(): void {
    this.companySuscription.unsubscribe();
  }

  onSubmit():void {
    console.log('Form:', this.formRegisterDepartament.value);

    const departamentData: IDepartment = {
      nombreDepartamento: this.formRegisterDepartament.value.nombreDepartamento ?? '',
      descripcion: this.formRegisterDepartament.value.descripcion ?? '',
      empresa_Id: this.companyCreated?.id_Empresa ?? 0
    }

    this.departamentService.createDepartament(departamentData).subscribe(
      (response) => {
        this.resultDepartamentCreated = response;
        console.log('Departament created:', this.resultDepartamentCreated);
        this.messageService.add({severity:'success', summary:'Departamento creado', detail:'Departamento creado con éxito'});

        this.departamentService.setDepartamentCreated(this.resultDepartamentCreated);

        setTimeout(() => {
          this.router.navigate(['/auth/credentials']);
        }, 2000);
      },
      (error) => {
        console.error('Error creating Departament:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear el departamento'});
      }
    );

    this.formRegisterDepartament.reset();

  }
}
