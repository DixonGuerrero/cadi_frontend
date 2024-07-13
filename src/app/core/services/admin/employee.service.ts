import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';

import { Observable, shareReplay,catchError, map, switchMap, of } from 'rxjs';
import { DepartamentService } from './departament.service';
import { IEmployee } from '../../models/employee.interface';
import { IResponse } from '../../models/response.interface';
import { IDepartment } from '../../models/departament.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.API_URL + 'Empleados/';
  http = inject(HttpClient);
  departamentService = inject(DepartamentService);
  private employeesCache$: Observable<IEmployee[]> | null = null;

  getEmployees(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl);
  }

  getEmployee(id: number): Observable<IResponse> {
    return this.http.get<IResponse>('http://cadi.somee.com/' + id);
  }

  getEmployeeByName(name: string) {
    return this.http.get(this.baseUrl + name);
  }

  createEmployee(employee: IEmployee): Observable<IEmployee | any> {
    return this.http.post<IEmployee | any>(this.baseUrl, employee);
  }

  updateEmployee(employee: IEmployee) {
    return this.http.put(this.baseUrl + "?id="+ employee.id_Empleado, employee);
  }

  getEmployeesByCompany(): Observable<IEmployee[]> {
    if (!this.employeesCache$) {
      this.employeesCache$ = this.loadEmployeesByCompany().pipe(
        shareReplay(1), // Cache the result
        catchError((error) => {
          this.employeesCache$ = null; // Reset cache on error
          return of([]); // Handle error and return an empty array
        })
      );
    }

    return this.employeesCache$;
  }

  updateEmployeesCache(): void {
    this.employeesCache$ = this.loadEmployeesByCompany().pipe(
      shareReplay(1),
      catchError((error) => {
        this.employeesCache$ = null; // Reset cache on error
        return of([]); // Handle error and return an empty array
      })
    );
  }

  private loadEmployeesByCompany(): Observable<IEmployee[]> {
    return this.getEmployees().pipe(
      switchMap((employeesResponse) => {
        const employeesList = employeesResponse.resultado as IEmployee[];
        return this.departamentService.getDepartmentsByCompany().pipe(
          map((departmentsList) => {
            return this.filterEmployeesByDepartment(employeesList, departmentsList);
          })
        );
      })
    );
  }

   private filterEmployeesByDepartment(
    employees: IEmployee[],
    departments: IDepartment[]
  ): IEmployee[] {
    return employees.filter((employee) =>
      departments.some(
        (department) => department.id_departamento === employee.departamento_Id
      )
    );
  }
}
