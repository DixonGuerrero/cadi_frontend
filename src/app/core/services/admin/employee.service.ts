import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { Observable, shareReplay, catchError, map, switchMap, of, Subject } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { IEmployee } from '../../models/employee.interface';
import { IResponse } from '../../models/response.interface';
import { IDepartment } from '../../models/departament.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.API_URL + 'Empleados/';
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  private employeesCache$: Observable<IEmployee[]> | null = null;

  private employeeCreatedSource = new Subject<IEmployee>();
  employeeCreated$ = this.employeeCreatedSource.asObservable();

  private employeeUpdatedSource = new Subject<IEmployee>();
  employeeUpdated$ = this.employeeUpdatedSource.asObservable();

  private employeeDeletedSource = new Subject<number>();
  employeeDeleted$ = this.employeeDeletedSource.asObservable();

  constructor() {}

  notifyEmployeeCreated(employee: IEmployee) {
    this.employeeCreatedSource.next(employee);
  }

  notifyEmployeeUpdated(employee: IEmployee) {
    this.employeeUpdatedSource.next(employee);
  }

  notifyEmployeeDeleted(employeeId: number) {
    this.employeeDeletedSource.next(employeeId);
  }

  getEmployees(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl);
  }

  getEmployee(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + id);
  }

  getEmployeeByName(name: string) {
    return this.http.get(this.baseUrl + name);
  }

  createEmployee(employee: IEmployee): Observable<IEmployee | any> {
    return this.http.post<IEmployee | any>(this.baseUrl, employee).pipe(
      map((createdEmployee: IEmployee) => {
        this.notifyEmployeeCreated(createdEmployee); // Notificar con los datos del empleado creado
        return createdEmployee;
      }),
      switchMap(() => this.clearCacheAndReturnEmployees())
    );
  }

  updateEmployee(employee: IEmployee) {
    return this.http.put(this.baseUrl + "?id=" + employee.id_Empleado, employee).pipe(
      map(() => {
        this.notifyEmployeeUpdated(employee); // Notificar con los datos del empleado actualizado
        return employee;
      }),
      switchMap(() => this.clearCacheAndReturnEmployees())
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id).pipe(
      map(() => {
        this.notifyEmployeeDeleted(id); // Notificar con el ID del empleado eliminado
      }),
      switchMap(() => this.clearCacheAndReturnEmployees())
    );
  }

  getEmployeesByCompany(): Observable<IEmployee[]> {
    if (!this.employeesCache$) {
      this.employeesCache$ = this.loadEmployeesByCompany().pipe(
        shareReplay(1),
        catchError((error) => {
          this.employeesCache$ = null;
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
        this.employeesCache$ = null;
        return of([]); 
      })
    );
  }

  private loadEmployeesByCompany(): Observable<IEmployee[]> {
    return this.getEmployees().pipe(
      switchMap((employeesResponse) => {
        const employeesList = employeesResponse.resultado as IEmployee[];
        return this.tokenService.getEmpresaIdObserver().pipe(
          switchMap((idEmpresa) => {
            return this.filterEmployeesByDepartment(employeesList, idEmpresa);
          })
        );
      })
    );
  }

  private filterEmployeesByDepartment(
    employees: IEmployee[],
    idEmpresa: number
  ): Observable<IEmployee[]> {
    return this.http.get<{ resultado: IDepartment[] }>(environment.API_URL + 'Departamentos/').pipe(
      map((departmentsResponse) => {
        const departmentsList = departmentsResponse.resultado.filter((department) => department.empresa_Id === idEmpresa);
        return employees.filter((employee) =>
          departmentsList.some(
            (department) => department.id_departamento === employee.departamento_Id
          )
        );
      })
    );
  }

  private clearCacheAndReturnEmployees(): Observable<IEmployee[]> {
    this.employeesCache$ = null;
    return this.getEmployeesByCompany();
  }
}
