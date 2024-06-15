import { Component, HostBinding, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive,RouterLink, NavBarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  logo: any;
  barraLateral: any;
  spans: any;
  palanca: any;
  circulo: any;
  menu: any;
  main: any;
  
  darkMode = signal<boolean>(true)
  bigMenu = signal<boolean>(false)

  ngOnInit(): void {
    this.initializeMenu();
    this.checkTimeForDarkMode()
  }

  @HostBinding('class.dark') get mode() {
    return this.darkMode()
  }

  initializeMenu(): void {
    this.logo = document.getElementById('logo');
    this.barraLateral =
      document.querySelector<HTMLDivElement>('.barra-lateral');
    this.spans = document.querySelectorAll<HTMLSpanElement>('span');
    this.palanca = document.querySelector<HTMLDivElement>('.switch');
    this.circulo = document.querySelector<HTMLDivElement>('.circulo');
    this.menu = document.querySelector<HTMLDivElement>('.menu');
    this.main = document.querySelector<HTMLElement>('main');

  }

  toggleLogo() {
    this.barraLateral.classList.toggle('mini-barra-lateral');
    this.main.classList.toggle('min-main');
    this.spans.forEach((span: any) => {
      span.classList.toggle('oculto');
    });
  }

  sizeSidebar() {
    this.bigMenu.set(!this.bigMenu())
    this.barraLateral.classList.toggle('max-barra-lateral');
    if (this.barraLateral.classList.contains('max-barra-lateral')) {
      if (this.menu.children.length > 1) {
        this.menu.children[0].setAttribute('style', 'display: none');
        this.menu.children[1].setAttribute('style', 'display: block');
      }
    } else {
      if (this.menu.children.length > 1) {
        this.menu.children[0].setAttribute('style', 'display: block');
        this.menu.children[1].setAttribute('style', 'display: none');
      }
    }
    if (window.innerWidth <= 320) {
      this.barraLateral.classList.add('mini-barra-lateral');
      this.main.classList.add('min-main');
      this.spans.forEach((span: any) => {
        span.classList.add('oculto');
      });
    }
  }

  checkTimeForDarkMode(): void {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) { 
      this.darkMode.set(true);
    } else {
      this.darkMode.set(false);
    }
  }

  
}
