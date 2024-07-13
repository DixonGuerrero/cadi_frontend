import { Routes } from '@angular/router';
<<<<<<< HEAD
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
   {
      path: '' , redirectTo: 'auth', pathMatch: 'full'
   },
   
   {
      path: 'auth', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.RoutesAuth),
   },
   {
      path: 'admin', loadChildren: () => import('./pages/admin/admin.routes').then(m => m.RoutesAdmin), canActivate: [loginGuard],
   },
   {
      path: '**', component: NotFoundComponent,
=======
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
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
   }
];
