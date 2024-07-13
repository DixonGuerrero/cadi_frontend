<<<<<<< HEAD
import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const RoutesAuth: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
   {
     path: 'login',
     component: LoginComponent,
   }
  
 ];
=======
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
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
