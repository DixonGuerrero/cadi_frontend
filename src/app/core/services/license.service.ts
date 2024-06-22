import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Observable, map } from 'rxjs';
import { ILicense, IResponse } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  baseUrl = environment.API_URL + 'Licencias';
  http = inject(HttpClient);  

  getLicenses():Observable<IResponse> {
    return this.http.get<IResponse>(this.baseUrl);
  }

  getLicense(id: number):Observable<ILicense> {
    return this.http.get<ILicense>(this.baseUrl + id);
  }

  createLicense(license: ILicense) {
    return this.http.post(this.baseUrl, license);
  }

  updateLicense(license: ILicense) {
    return this.http.put(this.baseUrl + "?id=" + license.id_Licencia, license);
  } 


/*   getLicensesByEmployee(id: number): Observable<ILicense[]> {
    return this.getLicenses().pipe(
      map((licenses: ILicense[]) => {
        return licenses.filter((license: ILicense) => license.empleado_Id === id);
      })
    );
  } */

}
