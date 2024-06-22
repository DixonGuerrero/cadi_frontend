import { Routes } from '@angular/router';
import { RoutesAuth } from './pages/auth/auth.routes';
import { RoutesAdmin } from './pages/admin/admin.routes';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { loginGuard } from './core/guards/sesion.guard';

export const routes: Routes = [
   {
      path: '', component: LandingPageComponent
   },
   {
      path: 'auth', children:  RoutesAuth
   },
   {
      path: 'admin', children: RoutesAdmin, canActivate: [loginGuard]
   }
];
