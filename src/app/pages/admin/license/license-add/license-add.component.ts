import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ILicense, LicenseType } from '../../../../core/models/types';
import { LicenseService } from '../../../../core/services/license.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-license-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './license-add.component.html',
  styleUrl: './license-add.component.css'
})
export class LicenseAddComponent implements AfterViewInit{

  @Input() id_employee: number = 0;
  licenseService = inject(LicenseService);
  toastrSvc = inject(ToastrService);

  licenceAddForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeLicense: new FormControl(''),
  });


  constructor( public modalService : ModalService) {}

  ngAfterViewInit(): void {
    
    this.modalService.initModal('license-modal' + this.id_employee);
  }


  onLicenseAdd() {
    const licenseAddData: ILicense = {
      empleado_Id: this.id_employee,
      fecha_Inicio: this.licenceAddForm.value.startDate ?? new Date(),
      fecha_Fin: this.licenceAddForm.value.endDate ?? new Date(),
      tipo: this.licenceAddForm.value.typeLicense as LicenseType ?? '',
    }

    this.licenseService.createLicense(licenseAddData).subscribe(
      (response) => {
        this.toastrSvc.success('Licencia creada');
        console.log('License created:', response);
      },
      (error) => {
        this.toastrSvc.error('Error al crear licencia');
        console.error('Error creating License:', error);
      }
    );

    this.licenceAddForm.reset()
    this.modalService.hideModal()
    console.log('onLicenseAdd', licenseAddData);
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
