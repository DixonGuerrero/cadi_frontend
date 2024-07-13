import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

//Providers the PrimeNG
import { MessageService, PrimeIcons } from 'primeng/api';
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
    DialogService 
  ],

=======

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr({ preventDuplicates: true, closeButton: true,  timeOut: 2500, positionClass: 'toast-bottom-left' ,easing: 'ease-in-out'}),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
};
