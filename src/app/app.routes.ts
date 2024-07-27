import { Routes } from '@angular/router';
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
   }
];
