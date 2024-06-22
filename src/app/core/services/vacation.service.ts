import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Observable, map } from 'rxjs';
import { IResponse, IVacation } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  baseUrl = environment.API_URL + 'Vacaciones';
  http = inject(HttpClient);

  getVacations():Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl);
  }

  getVacation(id: number):Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + id);
  }

  createVacation(vacation: IVacation) {
    return this.http.post(this.baseUrl, vacation);
  }

  updateVacation(vacation: IVacation) {
    return this.http.put(this.baseUrl + vacation.id_Vacaciones, vacation);
  }

  deleteVacation(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  getVacationsByEmployee(id: number): Observable<IVacation[]> {
    return this.getVacations().pipe(
      map((response: IResponse) => {
        const resultado = response.resultado as IVacation[];
        return resultado.filter((vacation: IVacation) => vacation.empleado_Id === id);
      })
    );
  }
}
