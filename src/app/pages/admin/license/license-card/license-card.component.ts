import { Component, Input, OnInit, inject } from '@angular/core';
import { IEmployee, ILicense } from '../../../../core/models/types';
import { EmployeeService } from '../../../../core/services/admin/employee.service';import { format } from 'date-fns';
import { LicenseEditComponent } from '../license-edit/license-edit.component';


@Component({
  selector: 'app-license-card',
  standalone: true,
  imports: [LicenseEditComponent],
  templateUrl: './license-card.component.html',
  styleUrl: './license-card.component.css'
})
export class LicenseCardComponent implements OnInit {

  employeService = inject(EmployeeService)
  employeLicense: IEmployee | undefined;

  @Input() license: ILicense = {
    id_Licencia: 0,
    fecha_Fin: '',
    fecha_Inicio: '',
    empleado_Id: 0,
  };

  ngOnInit(): void {
    this.loadDataEmploye()
  }

  loadDataEmploye(){

    this.employeService.getEmployee(this.license.empleado_Id).subscribe((response) => {
      this.employeLicense = response.resultado as IEmployee

    })  
  }

  handleLicenseEdited(licenseData: ILicense): void {
    console.log('Licencia actualizada en el padre:', licenseData);
    // Aquí puedes manejar la lógica para actualizar la licencia en el padre
    this.license = licenseData; // Actualizar datos en el padre según sea necesario
  }  


  stateLicense(){


    const today = format(new Date(), 'yyyy-MM-dd')
    const startDate = this.license.fecha_Inicio
    const endDate = this.license.fecha_Fin


    if(today >= startDate && today < endDate){
      return true
    }else{
      return false
    }
  }
  
}
