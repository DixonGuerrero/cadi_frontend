import { Component } from '@angular/core';
<<<<<<< HEAD
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
=======
import { RouterLink } from '@angular/router';
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

@Component({
  selector: 'app-landing-page',
  standalone: true,
<<<<<<< HEAD
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
=======
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
}
