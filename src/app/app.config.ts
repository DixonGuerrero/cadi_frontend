import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

//Providers the PrimeNG
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    MessageService,
    PrimeIcons,
    DialogService,
    ConfirmationService 
  ],

};
