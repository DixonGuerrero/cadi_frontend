import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { Observable, shareReplay, catchError, map, switchMap, of, Subject } from 'rxjs';
import { TokenService } from '../auth/token.service';
import { IDepartment } from '../../models/departament.interface';
import { IResponse } from '../../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {
  baseUrl = environment.API_URL + 'Departamentos/';
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  departamentCache$: Observable<IDepartment[]> | null = null;

  private departamentCreatedSource = new Subject<IDepartment>();
  departamentCreated$ = this.departamentCreatedSource.asObservable();

  private departamentUpdatedSource = new Subject<IDepartment>();
  departamentUpdated$ = this.departamentUpdatedSource.asObservable();

  private departamentDeletedSource = new Subject<number>();
  departamentDeleted$ = this.departamentDeletedSource.asObservable();

  constructor() {}

  notifyDepartamentCreated(departament: IDepartment) {
    this.departamentCreatedSource.next(departament);
  }

  notifyDepartamentUpdated(departament: IDepartment) {
    this.departamentUpdatedSource.next(departament);
  }

  notifyDepartamentDeleted(departamentId: number) {
    this.departamentDeletedSource.next(departamentId);
  }

  getDepartaments(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl);
  }

  getDepartmentsByCompany(): Observable<IDepartment[]> {
    if (!this.departamentCache$) {
      this.departamentCache$ = this.loadDepartmentsByCompany().pipe(
        shareReplay(1),
        catchError((error) => {
          this.departamentCache$ = null;
          return of([]); // Handle error and return an empty array
        })
      );
    }
    return this.departamentCache$;
  }

  private loadDepartmentsByCompany(): Observable<IDepartment[]> {
    const idEmpresa = this.tokenService.getEmpresaId();
    return this.http
      .get<{ resultado: IDepartment[] }>(this.baseUrl)
      .pipe(map((response) => response.resultado.filter((departament) => departament.empresa_Id === idEmpresa)));
  }

  getDepartament(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + id);
  }

  createDepartament(departament: IDepartment): Observable<IDepartment | any> {
    return this.http.post<IDepartment | any>(this.baseUrl, departament).pipe(
      map((createdDepartament: IDepartment) => {
        this.notifyDepartamentCreated(createdDepartament); // Notificar con los datos del departamento creado
        return createdDepartament;
      }),
      switchMap(() => this.clearCacheAndReturnDepartments())
    );
  }

  updateDepartament(departament: IDepartment): Observable<any> {
    return this.http.put(this.baseUrl + "?Id=" + departament.id_departamento, departament).pipe(
      map(() => {
        this.notifyDepartamentUpdated(departament); // Notificar con los datos del departamento actualizado
        return departament;
      }),
      switchMap(() => this.clearCacheAndReturnDepartments())
    );
  }

  deleteDepartament(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id).pipe(
      map(() => {
        this.notifyDepartamentDeleted(id); // Notificar con el ID del departamento eliminado
      }),
      switchMap(() => this.clearCacheAndReturnDepartments())
    );
  }

  private clearCacheAndReturnDepartments(): Observable<IDepartment[]> {
    this.departamentCache$ = null;
    return this.getDepartmentsByCompany();
  }

  updateDepartmentsCache(): void {
    this.departamentCache$ = this.http.get<IDepartment[]>(this.baseUrl).pipe(
      shareReplay(1),
      catchError((error) => {
        this.departamentCache$ = null;
        return of([]); 
      })
    );
  }
}
