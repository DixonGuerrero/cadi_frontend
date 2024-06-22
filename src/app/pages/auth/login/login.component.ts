import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ILogin } from '../../../core/models/types';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authS = inject(AuthService);

  constructor(private router: Router, public toast: ToastrService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin(): void {
    console.log('Login form:', this.loginForm.value);
    const loginData: ILogin = {
      Nombre_usuario: this.loginForm.value.username ?? '',
      contrasena: this.loginForm.value.password ?? '',
    };

    if (loginData.Nombre_usuario === '' || loginData.contrasena === '') {
      this.toast.error('Completa todos los campos');
      // Aquí retorna después de mostrar el toast
      return;
    }

    console.log('Login data:', loginData);

    this.authS.login(loginData).subscribe(
      (res) => {
        console.log('Login response:', res);

        if (!res.isExitoso) {
          console.log('Usuario o contraseña incorrectos');
          this.toast.error('Usuario o contraseña incorrectos');
          return;
        }

        this.toast.success('Inicio de sesión exitoso');

        this.router.navigate(['/admin']);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Login error:', error);
        // Mostrar mensaje de error al usuario, etc.
      }
    );
  }
}
