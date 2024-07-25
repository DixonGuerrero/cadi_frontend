import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@envs/environment';
import { ICompany } from '../models/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl = environment.API_URL + 'Empresa/';
  http = inject(HttpClient);

  private companyCreated = new BehaviorSubject<ICompany | null>( null );
  public companyCreated$ = this.companyCreated.asObservable();

  getCompanies() {
    return this.http.get(this.apiUrl);
  }

  getCompany(id: number): Observable<IResponse | any> {
    return this.http.get(this.apiUrl + id);
  }

  createCompany(company: ICompany): Observable<ICompany | any>{
    return this.http.post(this.apiUrl, company);
  }

  updateCompany(company: ICompany) {
    return this.http.put(this.apiUrl + company.id_Empresa, company);
  }


  setCompanyCreated(company: ICompany): void {
    this.companyCreated.next(company);
  }

  getCompanyCreated(): ICompany | null{
    return this.companyCreated.value;
  }
  
}
