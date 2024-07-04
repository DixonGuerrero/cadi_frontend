import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ILicense, LicenseType } from '../../../../core/models/types';
import { LicenseService } from '../../../../core/services/license.service';
import { ToastrService } from 'ngx-toastr';
import { Modal, ModalOptions, ModalInterface } from 'flowbite';


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
  toastrSvc = inject(ToastrService);
  modal: ModalInterface | null = null;  

  licenceAddForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeLicense: new FormControl(''),
  });


  constructor( public modalService : ModalService) {

    this.initModal('license-modal' + this.id_employee);
  }



  initModal(modalId: string, options: ModalOptions = {}) {
    const modalElement: HTMLElement =
      document.querySelector(`#${modalId}`) ?? document.createElement('div');

      console.log('modalElement', modalElement)

    if (modalElement) {
      const modalOptions: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',
        backdropClasses:
            'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
        closable: true,
        onHide: () => {
          
        },
        onShow: () => {
           
        },
        onToggle: () => {
            
        },
        ...options,
    };



      this.modal = new Modal(modalElement, modalOptions);
    }
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
    this.modal?.hide()
    this.modal?.destroy()
    console.log('onLicenseAdd', licenseAddData);
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
