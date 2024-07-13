import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IHours } from '../../../../core/models/types';
import { ToastrService } from 'ngx-toastr';
import { HoursWorkedService } from '../../../../core/services/hours-worked.service';

@Component({
  selector: 'app-hours-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hours-add.component.html',
  styleUrl: './hours-add.component.css',
})
export class HoursAddComponent implements AfterViewInit {
  @Input() id_employee: number = 0;
  toastrSvc = inject(ToastrService);
  hoursWorkedSvc = inject(HoursWorkedService);

  constructor(public modalService: ModalService) {}


  ngAfterViewInit() {

    this.modalService.initModal('vacations-modal' + this.id_employee);
  }

  formHoursWorked = new FormGroup({
    day: new FormControl(''),
    hoursWorked: new FormControl(8),
  });

  onHoursWorkedAdd() {

    if(this.formHoursWorked.invalid || this.formHoursWorked.value == null || undefined) return console.log('Invalid form')

    this.formHoursWorked.value.day ??= new Date().toLocaleDateString();
    this.formHoursWorked.value.hoursWorked ??= 8;

    this.formHoursWorked.value.day = new Date(this.formHoursWorked.value.day).toLocaleDateString();

    if(this.formHoursWorked.value.hoursWorked < 0) return console.log('Invalid hoursWorked', this.formHoursWorked.value.hoursWorked)

    const hoursWorked:IHours = {
      empleado_Id: this.id_employee,
      fecha: this.formHoursWorked.value.day,
      horas_trabajadas: this.formHoursWorked.value.hoursWorked,
    };

    this.hoursWorkedSvc.createHourWorked(hoursWorked).subscribe(
      (response) => {
        this.toastrSvc.success('Horas trabajadas creadas');
        console.log('HoursWorked created:', response);
      },
      (error) => {
        this.toastrSvc.error('Error al crear horas trabajadas');
        console.error('Error creating HoursWorked:', error);
      }
    );

    this.modalService.hideModal();
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
