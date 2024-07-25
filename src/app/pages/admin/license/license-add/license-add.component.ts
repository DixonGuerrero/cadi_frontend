import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ILicense, LicenseType } from '../../../../core/models/types';
import { LicenseService } from '../../../../core/services/license.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-license-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './license-add.component.html',
  styleUrl: './license-add.component.css'
})
export class LicenseAddComponent  {

  @Input() id_employee: number = 0;
  licenseService = inject(LicenseService);
  messageService = inject(MessageService)

  licenceAddForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeLicense: new FormControl(''),
  });



  onLicenseAdd() {
    const licenseAddData: ILicense = {
      empleado_Id: this.id_employee,
      fecha_Inicio: this.licenceAddForm.value.startDate ?? new Date(),
      fecha_Fin: this.licenceAddForm.value.endDate ?? new Date(),
      tipo: this.licenceAddForm.value.typeLicense as LicenseType ?? '',
    }

    this.licenseService.createLicense(licenseAddData).subscribe(
      (response) => {
        this.messageService.add({severity:'success', summary:'Licencia creada', detail:'Licencia creada correctamente'})
        console.log('License created:', response);
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear licencia'})
        console.error('Error creating License:', error);
      }
    );

    this.licenceAddForm.reset()
  
    console.log('onLicenseAdd', licenseAddData);
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
