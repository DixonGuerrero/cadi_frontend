import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DepartamentComponent } from './departament/departament.component';
import { CredentialsComponent } from './credentials/credentials.component';

export const RoutesAuth: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'departament',
    component: DepartamentComponent,
  },
  {
    path: 'credentials',
    component: CredentialsComponent,
  },
];
