import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Observable, map } from 'rxjs';
import { IResponse } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class HoursWorkedService {

  baseUrl = environment.API_URL + 'Horas';
  http = inject(HttpClient);

  getHoursWorked(): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl);
  }

  getHourWorked(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl + id);
  }

  createHourWorked(hour: any) {
    return this.http.post(this.baseUrl, hour);
  }

  updateHourWorked(hour: any) {
    return this.http.put(this.baseUrl + hour.id_Horas, hour);
  }


  getHoursWorkedByEmployee(id: number): Observable<any[]> {
    return this.getHoursWorked().pipe(
      map((response: IResponse) => {
        const resultado = response.resultado as any[];
        return resultado.filter((hour: any) => hour.empleado_Id === id);
      })
    );
  }
}
