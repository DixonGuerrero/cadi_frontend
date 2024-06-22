import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { IDepartment, IResponse } from '../models/types';
import { Observable, map, catchError, shareReplay, of, BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  baseUrl = environment.API_URL + 'Departamentos/';
  http = inject(HttpClient);  
  tokenService = inject(TokenService);
  departamentCache$: Observable<IDepartment[]> | null = null;

  private departamentCreated = new BehaviorSubject<IDepartment | null >(null);
  public departamentCreated$ = this.departamentCreated.asObservable();

  constructor() { }

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

  updateDepartamentCache(): void {
    this.departamentCache$ = this.loadDepartmentsByCompany().pipe(
      shareReplay(1),
      catchError((error) => {
        this.departamentCache$ = null;
        return of([]); // Handle error and return an empty array
      })
    );
  }

  private loadDepartmentsByCompany(): Observable<IDepartment[]> {
    const idEmpresa = this.tokenService.getEmpresaId();
    return this.http
      .get<{ resultado: IDepartment[] }>(this.baseUrl)
      .pipe(map((response) => response.resultado.filter((departament) => departament.empresa_Id === idEmpresa)));
  }

  getDepartament(id: number):Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + id);
  }

  createDepartament(departament: IDepartment): Observable<IDepartment | any>{
    return this.http.post(this.baseUrl, departament);
  }

  updateDepartament(departament: IDepartment) {
    return this.http.put(this.baseUrl + departament.id_departamento, departament);
  }

  setDepartamentCreated(departament: IDepartment): void {
    this.departamentCreated.next(departament);
  }

  getDepartamentCreated(): IDepartment | null {
    return this.departamentCreated.value;
  }
}
