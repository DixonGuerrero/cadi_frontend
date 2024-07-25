import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { addDays, isSameDay, isWeekend, parseISO, format } from 'date-fns';
import { IVacation } from '../../../../core/models/types';
import { VacationService } from '../../../../core/services/vacation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vacations-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vacations-add.component.html',
  styleUrls: ['./vacations-add.component.css'],
})
export class VacationsAddComponent implements AfterViewInit {
  @Input() id_employee: number = 0;
  endDate: any = null;
  COLOMBIA_HOLIDAYS_2024 = [
    '2024-01-01', '2024-01-08', '2024-03-25', '2024-03-28',
    '2024-04-01', '2024-05-01', '2024-05-13', '2024-06-03',
    '2024-06-24', '2024-07-01', '2024-07-20', '2024-08-07',
    '2024-08-19', '2024-10-14', '2024-11-04', '2024-11-11',
    '2024-12-08', '2024-12-25'
  ].map(dateString => parseISO(dateString));
  vacationsDates = 15;

  //Service 
  vacationService = inject(VacationService);

  constructor( public messageService: MessageService) {}

  ngAfterViewInit() {
   
  }

  formVacation = new FormGroup({
    startDate: new FormControl(),
  });

  onVacationAdd() {
    if (this.formVacation.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, complete el formulario.' });
      return;
    }

    this.validateVacationDate();

    const startDate = new Date(this.formVacation.value.startDate);
    const endDate = this.calculateVacationEndDate(startDate, this.vacationsDates, this.COLOMBIA_HOLIDAYS_2024);

    const vacations: IVacation = {
      empleado_Id: this.id_employee,
      fecha_inicio: format(startDate, 'yyyy-MM-dd'),
      fecha_fin: format(endDate, 'yyyy-MM-dd')
    };


    this.vacationService.createVacation(vacations).subscribe(
      (response) => {
        console.log('Vacation created:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Vacaciones creadas',
          detail: 'Vacaciones creadas exitosamente.'
        })
      },
      (error) => {
        console.error('Error creating vacation:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al crear las vacaciones.'
        })
      }
    );
    this.formVacation.reset();
  }

  onStartDateChange(): void {
    this.previewVacationEndDate();
  }

  previewVacationEndDate(): void {
    this.validateVacationDate();

    const startDate = new Date(this.formVacation.value.startDate);
    const endDate = this.calculateVacationEndDate(startDate, this.vacationsDates, this.COLOMBIA_HOLIDAYS_2024);

    this.endDate = this.formatDate(endDate);
  }

  onDateClick(event: MouseEvent) {
    event.stopPropagation();
  }

  isColombianHoliday(date: Date, holidays: Date[]): boolean {
    return holidays.some(holiday => isSameDay(date, holiday));
  }

  isLaborDayInColombia(date: Date, holidays: Date[]): boolean {
    return !isWeekend(date) && !this.isColombianHoliday(date, holidays);
  }

  calculateVacationEndDate(startDate: Date, vacationDays: number, holidays: Date[]): Date {
    let remainingDays = vacationDays;
    let currentDate = startDate;

    while (remainingDays > 0) {
      currentDate = addDays(currentDate, 1);

      // Check if the current day is a labor day in Colombia
      if (this.isLaborDayInColombia(currentDate, holidays)) {
        remainingDays--;
      }
    }

    return currentDate;
  }

  formatDate(date: Date | null): string {
    if (date === null || date === undefined) {
      return '';
    }
    return format(date, 'yyyy-MM-dd');
  }

  validateVacationDate(): void {
    if (this.formVacation.value.startDate === null || this.formVacation.value.startDate === undefined) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, seleccione una fecha de inicio.' });
      return;
    }

    if (this.formVacation.value.startDate < this.formatDate(new Date())) {
      console.log('validation second if');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha de inicio no puede ser menor a la fecha actual.' });
      return;
    }

    console.log('validation third if');
  }
}
