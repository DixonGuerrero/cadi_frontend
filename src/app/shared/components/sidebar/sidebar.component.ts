import { Component, HostBinding, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ICompany } from '../../../core/models/company.interface';
import { TokenService } from '../../../core/services/auth/token.service';
import { CompanyService } from '../../../core/services/company.service';
import { ThemeService } from '../../../core/services/admin/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    NavBarComponent,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] | undefined;
  empresa: ICompany | undefined;

  logo: any;
  barraLateral: any;
  spans: any;
  palanca: any;
  circulo: any;
  menu: any;
  main: any;

  darkMode = signal<boolean>(true);
  bigMenu = signal<boolean>(false);

  constructor(
    private tokenService: TokenService,
    private companyService: CompanyService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh',
          },
          {
            label: 'Export',
            icon: 'pi pi-upload',
          },
        ],
      },
    ];
    this.initializeMenu();
    this.checkTimeForDarkMode();
    this.loadDataCompany();
  }

  toggleDarkMode() {
    this.themeService.updateDarkMode();
  }

  loadDataCompany() {
    const idEmpresa = this.tokenService.getEmpresaId();

    console.log('ID EMPRESA', idEmpresa);
    this.companyService.getCompany(idEmpresa).subscribe((response) => {
      this.empresa = response.resultado as ICompany;
    });
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
    console.log(this.main);
    this.spans.forEach((span: any) => {
      span.classList.toggle('oculto');
    });
  }

  sizeSidebar() {
    this.bigMenu.set(!this.bigMenu());
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
      this.toggleDarkMode()
    } else {
      this.darkMode.set(false);
    }
  }
}
 