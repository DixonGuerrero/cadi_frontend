import { Component, OnInit, inject } from '@angular/core';
import { DepartamentService } from '../../../../core/services/departament.service';
import { IDepartment } from '../../../../core/models/types';
import { DepartamentCardComponent } from '../departament-card/departament-card.component';
import { DepartamentAddComponent } from '../departament-add/departament-add.component';

@Component({
  selector: 'app-departament-page',
  standalone: true,
  imports: [DepartamentCardComponent,
    DepartamentAddComponent
  ],
  templateUrl: './departament-page.component.html',
  styleUrl: './departament-page.component.css'
})
export class DepartamentPageComponent implements OnInit{

  departaments: IDepartment [] = []
  departamentService = inject(DepartamentService)

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.departamentService.getDepartmentsByCompany().subscribe((response) => {
      this.departaments = response as IDepartment[]
    })
  }

  handleDeleteDepartament(departamentDelete:IDepartment){
    this.departaments = this.departaments.filter((departament) => departament.id_departamento != departamentDelete.id_departamento)
   }

   handleCreateDepartament(departamentCreate: IDepartment){
    this.departaments.push(departamentCreate)
   }
}
