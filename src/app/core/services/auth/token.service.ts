import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';  
import { CookieService } from 'ngx-cookie-service';
import { Observable, Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor(private cookieService: CookieService) {}

  decodeToken(token: string): any {
    try {
      return jwt.jwtDecode(token); // Utilizar jwtDecode para decodificar el token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getEmpresaId(): number {
    const empresaIdString = this.cookieService.get('empresaId');
    return parseInt(empresaIdString, 10);
  }
  getEmpresaIdObserver(): Observable<number> {
    const empresaIdString = this.cookieService.get('empresaId');
    const empresaId = parseInt(empresaIdString, 10);
    return of(empresaId);
  }

  storeTokenInCookies(token: string, empresaId: number): Observable<void> {
    return new Observable<void>((observer) => {
      // Guarda el token y el ID de la empresa en las cookies
      this.cookieService.set('token', token, {
        expires: this.getTokenExpiration(token),
        sameSite: 'Strict',
        secure: true // Asegúrate de que esto sea true si estás usando HTTPS
      });
  
      // Almacena el ID de la empresa en las cookies
      this.cookieService.set('empresaId', empresaId.toString(), {
        expires: this.getTokenExpiration(token),
        sameSite: 'Strict',
        secure: true // Asegúrate de que esto sea true si estás usando HTTPS
      });
  
      observer.next();
      observer.complete();
    });
  }
  

  deleteTokenFromCookies(): void {
    // Elimina el token de las cookies
    this.cookieService.delete('token');
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    try {
      const decoded: any = jwt.jwtDecode(token);  // Utilizar jwtDecode para verificar el token
      if (decoded.exp === undefined) return false;

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date.valueOf() < new Date().valueOf();
    } catch (error) {
      console.error('Error verifying token:', error);
      return true; // Tratar como expirado si hay error
    }
  }

  private getTokenExpiration(token: string): Date {
    const decoded: any = jwt.jwtDecode(token);
    if (decoded.exp === undefined) { return new Date(); }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
