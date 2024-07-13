import { Routes } from '@angular/router';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { EmployeesPageComponent } from './employees/employees-page/employees-page.component';

export const RoutesAdmin: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
         path: 'employees', component: EmployeesPageComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
=======
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employee-page/employees.component';
import { VacationsComponent } from './vacations/vacations-page/vacations.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { LicensePageComponent } from './license/license-page/license-page.component';
import { DepartamentPageComponent } from './departament/departament-page/departament-page.component';


export const RoutesAdmin: Routes = [
   {
      path: '', component: AdminLayoutComponent, children:[
         {
            path: '', redirectTo: 'dashboard', pathMatch: 'full'
         },
         {
            path: 'dashboard', component: DashboardComponent
         },
         {
            path: 'employees', component: EmployeesComponent
         },
         {
            path: 'vacations', component: VacationsComponent
         },
         {
            path: 'search', component: SearchComponent
         },
         {
            path: 'settings', component: SettingsComponent
         },
         {
            path: 'licenses' , component: LicensePageComponent
         },
         {
            path: 'departament-page' , component:DepartamentPageComponent
         },
         {
            path: '**', redirectTo: 'dashboard'
         }
      ]
   }
]
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
