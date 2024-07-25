import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { ILogin } from '../../../core/models/login.interface';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, ButtonModule, RippleModule, PasswordModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authS = inject(AuthService);

  constructor(private router: Router, private messageService: MessageService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin(): void {
    console.log('Login form:', this.loginForm.value);
    const loginData: ILogin = {
      nombre_Usuario: this.loginForm.value.username ?? '',
      contrasena: this.loginForm.value.password ?? '',
    };

    if (loginData.nombre_Usuario === '' || loginData.contrasena === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos Vacios' });
      // Aquí retorna después de mostrar el toast
      return;
    }

    console.log('Login data:', loginData);

    this.authS.login(loginData).subscribe(
      (res) => {
        console.log('Login response:', res);

        if (!res.isExitoso) {
          console.log('Usuario o contraseña incorrectos');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
          return;
        }

        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Inicio de sesion exitoso' });

        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1500);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Login error:', error);
        // Mostrar mensaje de error al usuario, etc.
      }
    );
  }
}
