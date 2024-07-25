import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IHours } from '../../../../core/models/types';
import { HoursWorkedService } from '../../../../core/services/hours-worked.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-hours-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hours-add.component.html',
  styleUrl: './hours-add.component.css',
})
export class HoursAddComponent implements AfterViewInit {
  @Input() id_employee: number = 0;
  messageService = inject(MessageService)
  hoursWorkedSvc = inject(HoursWorkedService);

  ngAfterViewInit() {

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
        this.messageService.add({severity:'success', summary:'Horas trabajadas creadas', detail:'Horas trabajadas creadas correctamente'})
        console.log('HoursWorked created:', response);
      },
      (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear horas trabajadas'})
        console.error('Error creating HoursWorked:', error);
      }
    );

  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
