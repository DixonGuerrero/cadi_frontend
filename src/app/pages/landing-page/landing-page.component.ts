import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ButtonModule, SpeedDialModule, ToastModule, MenuModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
          },
          {
            label: 'Beneficio',
            icon: 'pi pi-gift',
          },
          {
            label: 'Contacto',
            icon: 'pi pi-envelope',
          },
          {
            label: 'Ingresar',
            icon: 'pi pi-sign-in',
            routerLink: ['/login'],
          },
        ],
      },
    ];
  }
}
