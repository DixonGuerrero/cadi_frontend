import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '@envs/environment.development';
import { IDepartment, IEmployee, ILogin, IResponse, IUsuario } from '../models/types';
import { TokenService } from './token.service';
import { EmployeeService } from './employee.service';
import { DepartamentService } from './departament.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.API_URL + 'Usuarios';
   private router = inject(Router);

  // Inyectamos los servicios que vamos a utilizar
  private tokenService = inject(TokenService);
  private employeeService = inject(EmployeeService);
  private departamentoService = inject(DepartamentService);

  constructor(private http: HttpClient) {}

  login(loginData: ILogin): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/login`, loginData).pipe(
      switchMap((response) => {

         if (!response.isExitoso) {
            console.log('Usuario o contraseña incorrectos');

            const respuesta: IResponse = {
               isExitoso: false,
               mensaje: 'Usuario o contraseña incorrectos',
               };
            
            return new Observable<IResponse>( (observer) => {
               observer.next(respuesta);
               observer.complete();

         });
         }
        const  token  = response.token;
        if (!token) return new Observable<IResponse>();

        const tokenDecoded = this.tokenService.decodeToken(token);
        console.log('token info ', tokenDecoded);

        const empleadoId = tokenDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'][1];
        console.log('empleado id ', empleadoId);

        // Ahora vamos a traer los datos del empleado
        return this.employeeService.getEmployee(empleadoId).pipe(
          switchMap((employeeResponse) => {
            const empleado = employeeResponse.resultado as IEmployee;
            console.log('departamento id ', empleado.departamento_Id);

            return this.departamentoService.getDepartament(empleado.departamento_Id).pipe(
              tap((departamentoResponse) => {
                const departamento = departamentoResponse.resultado as IDepartment;
                console.log('idEmpresa: ', departamento.empresa_Id);
                this.tokenService.storeTokenInCookies(token, departamento.empresa_Id);
              })
            );
          })
        );
      })
    );
  }

  register(registerData: IUsuario): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/register`, registerData);
  }

  
}
