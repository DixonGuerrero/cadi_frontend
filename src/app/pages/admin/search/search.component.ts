import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IDepartment, IEmployee } from '../../../core/models/types';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../../core/services/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeCardComponent } from '../employees/employee-card/employee-card.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { SearchService } from '../../../core/services/admin/search.service';
import { MessageService } from 'primeng/api';
import { DepartamentService } from '../../../core/services/admin/departament.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [EmployeeCardComponent, NavBarComponent, ReactiveFormsModule, MultiSelectModule, ButtonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchTerm = '';
  departamentsFilterOptions: IDepartment[] = [];
  departamentService = inject(DepartamentService);
  results: IEmployee[] = [];
  employeeService = inject(EmployeeService);
  messageService = inject(MessageService);
  resultsCopyBeforeFilter: IEmployee[] = [];

  departamentForm = new FormGroup({
    departament: new FormControl()
  });

  private searchSubscription: Subscription = new Subscription();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    console.log('INIT SEARCH COMPONENT');

    // Inicializa el término de búsqueda si ya existe
    this.searchTerm = this.searchService.getSearchTerm();
    console.log('TERMINO DE BUSQUEDA ESTABLECIDO:', this.searchTerm);
this.loadDataDepartament();
    // Suscríbete a los cambios en el término de búsqueda
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      console.log('TERMINO DE BUSQUEDA RECIBIDO EN SUSCRIPCIÓN:', this.searchTerm);

      if (this.searchTerm.trim().length > 0) {
        
        this.search();
      } else {
        console.log('El término de búsqueda está vacío, omitiendo búsqueda inicial.');
      }

      this.resultsCopyBeforeFilter = this.results;
    });
  }

  loadDataDepartament(): void {
    this.departamentService.getDepartmentsByCompany().subscribe(departaments => {
      console.log('DEPARTAMENTOS:', departaments);
      this.departamentsFilterOptions = departaments;
    });
  }

  search(): void {

    if(this.searchTerm === '') {
      this.messageService.add({severity:'error', summary:'Error', detail:'El campo de búsqueda no puede estar vacío'});
      return;
    }

    this.employeeService.getEmployeesByCompany().subscribe(employees => {
      this.results = employees.filter(employee =>
        employee.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  filterDepartament(): void {
    const departamentFiltering = this.departamentForm.value.departament as IDepartment[];

    if (departamentFiltering === null) {
      return;
    }

    console.log('departamentFiltering', departamentFiltering[0]);
    
    this.results = this.resultsCopyBeforeFilter.filter(employee => employee.departamento_Id === departamentFiltering[0].id_departamento);

  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }
}
