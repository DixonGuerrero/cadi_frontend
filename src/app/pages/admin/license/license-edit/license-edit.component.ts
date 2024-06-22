import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LicenseService } from '../../../../core/services/license.service';
import { ILicense, LicenseType } from '../../../../core/models/types';

@Component({
  selector: 'app-license-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './license-edit.component.html',
  styleUrl: './license-edit.component.css',
})
export class LicenseEditComponent implements AfterViewInit, OnInit {
  @Input() licenseEdit: ILicense = {
    id_Licencia: 0,
    fecha_Fin: '',
    fecha_Inicio: '',
    empleado_Id: 0,
    tipo: 'Luto',
  };

  @Output() licenseEdited: EventEmitter<ILicense> = new EventEmitter<ILicense>();
  licenseService = inject(LicenseService);
  toastrSvc = inject(ToastrService);
  modalService = inject(ModalService);

  licenceAddForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    typeLicense: new FormControl(''),
  });

  ngOnInit(): void {
    console.log('licenseEdit', this.licenseEdit);
    this.initFormValues();
  }

  ngAfterViewInit(): void {
    this.modalService.initModal('license-modal-edit' + this.licenseEdit.id_Licencia);
  }

  private initFormValues() {
    this.licenceAddForm.patchValue({
      startDate: this.licenseEdit.fecha_Inicio.toString(),
      endDate: this.licenseEdit.fecha_Fin.toString(),
      typeLicense: this.licenseEdit.tipo?.toString() ?? "Luto",
    });
  }

  onLicenseEdit() {
    const licenseAddData: ILicense = {
      empleado_Id: this.licenseEdit.empleado_Id,
      fecha_Inicio: this.licenceAddForm.value.startDate ?? this.licenseEdit.fecha_Inicio,
      fecha_Fin: this.licenceAddForm.value.endDate ?? this.licenseEdit.fecha_Fin,
      tipo: (this.licenceAddForm.value.typeLicense as LicenseType) ?? '',
      id_Licencia: this.licenseEdit.id_Licencia,
    };

    console.log('License edited:', licenseAddData);

    this.licenseService.updateLicense(licenseAddData).subscribe(
      (response) => {
        this.toastrSvc.success('Licencia editada');
        console.log('License edited:', response);
        this.licenseEdit = licenseAddData;

        this.licenseEdited.emit(this.licenseEdit);
      },
      (error) => {
        this.toastrSvc.error('Error al editar licencia');
        console.error('Error editing License:', error);
      }
    );

    

    this.modalService.hideModal();
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
