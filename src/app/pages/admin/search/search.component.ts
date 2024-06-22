import { Component, OnInit, inject } from '@angular/core';
import { IDepartment, IEmployee } from '../../../core/models/types';
import { EmployeeCardComponent } from '../../../shared/components/employee-card/employee-card.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { SearchService } from '../../../core/services/search.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../../core/services/employee.service';
import { DepartamentService } from '../../../core/services/departament.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [EmployeeCardComponent,NavBarComponent, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  departamentsFilterOptions: IDepartment[] = []
  departamentService = inject(DepartamentService)
  results: IEmployee[] = []; 
  employeeService = inject(EmployeeService)

  resultsCopyBeforeFilter:IEmployee[] = []



  departamentForm = new FormGroup({
    departament: new FormControl(0)
  })

  private searchSubscription: Subscription = new Subscription();


  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;

      console.log('ESTE ES EL TERMINO DE BUSQUEDA', this.searchTerm)
      this.loadDataDepartament()
      this.search()

      this.resultsCopyBeforeFilter = this.results

    });
  }

  loadDataDepartament(){
    this.departamentService.getDepartmentsByCompany().subscribe((departaments) => {
      this.departamentsFilterOptions = departaments
    })
  }

  search(): void {
    this.employeeService.getEmployeesByCompany().subscribe((employees) => {
      this.results = employees.filter((employee) => {
        return employee.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    });
  }

  filterDepartament(){
    const departamentId = this.departamentForm.value.departament ?? 0;

    if(departamentId === 0){
      return;
    }


    this.results = this.resultsCopyBeforeFilter
    

    console.log('ESTE ES EL ID DEL DEPARTAMENTO', departamentId)

    console.log('ESTOS SON LOS EMPLEADOS', this.results)

    this.results =  this.results.filter((employe) => employe.departamento_Id == departamentId)

    console.log('empleado filtrado por departametno ', this.results)
    
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }


 
}
