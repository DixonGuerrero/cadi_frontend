import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap,  } from 'rxjs';
import { environment } from '@envs/environment.development';
import { ILogin, IResponse, IUsuario } from '../models/types';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.API_URL + 'Usuarios';
   private router = inject(Router);

  // Inyectamos los servicios que vamos a utilizar
  private tokenService = inject(TokenService);
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
          
          return of(respuesta); // Usamos `of` para devolver un Observable que emite el valor
        }
        
        const token = response.token;
        if (!token) return of({ isExitoso: false, mensaje: 'No token received' });
  
        const tokenDecoded = this.tokenService.decodeToken(token);
        console.log('token info ', tokenDecoded);
  
        const empresaId = tokenDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'][1];
  
        // Cambiamos a usar un Observable en storeTokenInCookies
        return this.tokenService.storeTokenInCookies(token, empresaId).pipe(
          map(() => response)
        );
      })
    );
  }

  register(registerData: IUsuario): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/register`, registerData);
  }

  
}
