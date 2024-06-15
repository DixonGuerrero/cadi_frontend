import { AfterViewInit, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-vacations-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vacations-add.component.html',
  styleUrl: './vacations-add.component.css',
})
export class VacationsAddComponent implements AfterViewInit {
  @Input() id_employee: number = 0;

  constructor(public modalService: ModalService) {}

  ngAfterViewInit() {
    console.log('vacations-add' + this.id_employee);
    this.modalService.initModal('vacations-modal' + this.id_employee);
  }

  formVacation = new FormGroup({
    startDate: new FormControl(''),
  });

  onVacationAdd() { 
    const vacations = {
      id_employee: this.id_employee,
      startDate: this.formVacation.value.startDate,
    };

    console.log('onVacationAdd', this.modalService);

    this.modalService.hideModal();
    console.log('Submitting vacations:', vacations);1
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
