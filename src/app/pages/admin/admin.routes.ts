import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employee-page/employees.component';
import { VacationsComponent } from './vacations/vacations-page/vacations.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { LicensePageComponent } from './license/license-page/license-page.component';


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
            path: '**', redirectTo: 'dashboard'
         }
      ]
   }
]
