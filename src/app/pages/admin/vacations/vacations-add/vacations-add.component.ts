import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ModalService } from '../../../../core/services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { addDays, isSameDay, isWeekend, parseISO, format } from 'date-fns';
import { IVacation } from '../../../../core/models/types';
import { VacationService } from '../../../../core/services/vacation.service';

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

  constructor(public modalService: ModalService, public toastService: ToastrService) {}

  ngAfterViewInit() {
    this.modalService.initModal('vacations-modal' + this.id_employee);
  }

  formVacation = new FormGroup({
    startDate: new FormControl(),
  });

  onVacationAdd() {
    if (this.formVacation.invalid) {
      this.toastService.error('Por favor, rellene todos los campos.');
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
        this.toastService.success('Vacaciones creadas exitosamente.');
      },
      (error) => {
        console.error('Error creating vacation:', error);
        this.toastService.error('Error al crear vacaciones.');
      }
    );
    this.formVacation.reset();
    this.modalService.hideModal();
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
      this.toastService.error('Por favor, seleccione una fecha de inicio de vacaciones.');
      return;
    }

    if (this.formVacation.value.startDate < this.formatDate(new Date())) {
      console.log('validation second if');
      this.toastService.error('La fecha de inicio de las vacaciones no puede ser menor a la fecha actual.');
      return;
    }

    console.log('validation third if');
  }
}
