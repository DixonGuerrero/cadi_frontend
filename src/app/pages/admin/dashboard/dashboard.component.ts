import { Component, OnInit, inject } from '@angular/core';
import { EmployeeCardComponent } from '../employees/employee-card/employee-card.component';
import { RouterLink } from '@angular/router';
import { IEmployee } from '../../../core/models/employee.interface';
import { ButtonModule } from 'primeng/button';
import { EmployeeService } from '../../../core/services/admin/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EmployeeCardComponent, RouterLink,ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // Services
  private employeeS = inject(EmployeeService);
  private subscriptions: Subscription = new Subscription();

  // Variables
  public employees: IEmployee[] = [];

  constructor() {}

  quantityEmployees = '0';
  countHoursWorked = '1.000.000';
  quantifyEmployeesVacation = '5.000';

  ngOnInit(): void {
    this.initData();
    this.setupSubscriptions();
  }

  initData() {
    this.employeeS.getEmployeesByCompany().subscribe((employees) => {
      this.employees = employees;
     

      this.quantityEmployees = this.countEmployees();
      this.quantifyEmployeesVacation = this.countEmployeesInVacation();
  })
  }

  setupSubscriptions(): void {
    const createdSubscription = this.employeeS.employeeCreated$.subscribe((newEmployee) => {
      console.log('Nuevo empleado creado:', newEmployee);
      if(newEmployee){
        this.employees.push(newEmployee);
      }
    });
    
    const updatedSubscription = this.employeeS.employeeUpdated$.subscribe((updatedEmployee) => {
      console.log('Empleado actualizado:', updatedEmployee);
      const index = this.employees.findIndex(d => d.id_Empleado === updatedEmployee.id_Empleado);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
        console.log('Lista Actualizada:', this.employees);
      }
    });
  
    const deletedSubscription = this.employeeS.employeeDeleted$.subscribe((deletedEmployeeId) => {
      console.log('Empleado eliminado con ID:', deletedEmployeeId);
      this.employees = this.employees.filter(d => d.id_Empleado !== deletedEmployeeId);
    });
  
    this.subscriptions.add(createdSubscription);
    this.subscriptions.add(updatedSubscription);
    this.subscriptions.add(deletedSubscription);
  }
  

  countEmployees(){
    return this.employees.length.toString();
  }

  countEmployeesInVacation(){
    return this.employees.filter((employee) => employee.vacaciones).length.toString();
  }
}
