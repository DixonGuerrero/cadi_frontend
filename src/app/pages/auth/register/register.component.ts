import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ICompany } from '../../../core/models/types';
import { CompanyService } from '../../../core/services/company.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  companyService = inject(CompanyService);
  messageService = inject(MessageService)
  router = inject(Router);

  resultCreateCompany: ICompany | any;

  formRegisterCompany = new FormGroup({
    nombreEmpresa: new FormControl(''),
    direccion : new FormControl(''),
    telefono: new FormControl(''),
    email: new FormControl('')
  });

  onSubmit(): void {
    console.log('Form:', this.formRegisterCompany.value);

    const companyData: ICompany = {
      nombreEmpresa: this.formRegisterCompany.value.nombreEmpresa ?? '',
      direccion: this.formRegisterCompany.value.direccion ?? '',
      telefono: this.formRegisterCompany.value.telefono ?? '',
      email: this.formRegisterCompany.value.email ?? ''
    }

    this.companyService.createCompany(companyData).subscribe(
      (response) => {
        this.resultCreateCompany = response;
        console.log('Company created:', this.resultCreateCompany);
        this.messageService.add({severity:'success', summary:'Empresa creada', detail:'Empresa creada con éxito'});

        this.companyService.setCompanyCreated(this.resultCreateCompany);

        setTimeout(() => {
          this.router.navigate(['/auth/departament']);
        }, 2000);
      },
      (error) => {
        console.error('Error creating Company:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear la empresa'});
      }
    );

    this.formRegisterCompany.reset();
  }

}
