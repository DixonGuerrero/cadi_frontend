import { Routes } from '@angular/router';

export const routes: Routes = [
   {
      path: '', loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
   },
   {
      path: 'auth', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.RoutesAuth)
   },
   {
      path: 'admin', loadChildren: () => import('./pages/admin/admin.routes').then(m => m.RoutesAdmin)
   }
];
