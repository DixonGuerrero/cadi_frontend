import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../core/services/modal.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hours-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hours-add.component.html',
  styleUrl: './hours-add.component.css',
})
export class HoursAddComponent {
  @Input() id_employee: number = 0;

  constructor(public modalService: ModalService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log('vacations-add' + this.id_employee);
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

    const hoursWorked = {
      id_employee: this.id_employee,
      day: this.formHoursWorked.value.day,
      hoursWorked: this.formHoursWorked.value.hoursWorked,
    };



    //TODO: Implementar la lógica para guardar las horas trabajadas

    console.log('onVacationAdd', this.modalService);

    this.modalService.hideModal();
    console.log('Submitting hoursWorked:', hoursWorked);
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
