<<<<<<< HEAD
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
=======
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ILogin } from '../../../core/models/types';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, ReactiveFormsModule, ButtonModule, RippleModule, PasswordModule, InputTextModule],
=======
  imports: [RouterLink, ReactiveFormsModule],
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authS = inject(AuthService);

<<<<<<< HEAD
  constructor(private router: Router, private messageService: MessageService) {}
=======
  constructor(private router: Router, public toast: ToastrService) {}
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin(): void {
    console.log('Login form:', this.loginForm.value);
    const loginData: ILogin = {
<<<<<<< HEAD
      nombre_Usuario: this.loginForm.value.username ?? '',
      contrasena: this.loginForm.value.password ?? '',
    };

    if (loginData.nombre_Usuario === '' || loginData.contrasena === '') {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos Vacios' });
=======
      Nombre_usuario: this.loginForm.value.username ?? '',
      contrasena: this.loginForm.value.password ?? '',
    };

    if (loginData.Nombre_usuario === '' || loginData.contrasena === '') {
      this.toast.error('Completa todos los campos');
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
      // Aquí retorna después de mostrar el toast
      return;
    }

    console.log('Login data:', loginData);

    this.authS.login(loginData).subscribe(
      (res) => {
        console.log('Login response:', res);

        if (!res.isExitoso) {
          console.log('Usuario o contraseña incorrectos');
<<<<<<< HEAD
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos' });
          return;
        }

        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Inicio de sesion exitoso' });

        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 1500);
=======
          this.toast.error('Usuario o contraseña incorrectos');
          return;
        }

        this.toast.success('Inicio de sesión exitoso');

        this.router.navigate(['/admin']);
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
      },
      (error) => {
        // Manejar errores aquí
        console.error('Login error:', error);
        // Mostrar mensaje de error al usuario, etc.
      }
    );
  }
}
