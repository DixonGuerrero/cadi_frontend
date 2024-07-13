import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { LicenseService } from '../../../../core/services/license.service';
import { IEmployee, ILicense } from '../../../../core/models/types';
import { LicenseCardComponent } from '../license-card/license-card.component';

@Component({
  selector: 'app-license-page',
  standalone: true,
  imports: [LicenseCardComponent],
  templateUrl: './license-page.component.html',
  styleUrl: './license-page.component.css'
})
export class LicensePageComponent implements OnInit {

  employeService = inject(EmployeeService)
  licenseService = inject(LicenseService)
  
  licenses: ILicense[] = []



  ngOnInit(): void {
    this.loadDataLicense();
  }

  loadDataLicense(){
    this.licenseService.getLicenses().subscribe((response) => {
      const licenses = response.resultado as ILicense[]

      this.employeService.getEmployeesByCompany().subscribe((employees) => {
        this.filterLicenseByEmployee(licenses, employees)
      }) 
    })
  }

  filterLicenseByEmployee(licenses: ILicense[], employees: IEmployee[]){
    this.licenses = licenses.filter((license) => {
      return employees.some((employee) => employee.id_Empleado === license.empleado_Id)
    })
  }



}
