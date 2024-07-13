import { Component } from '@angular/core';
<<<<<<< HEAD
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SearchService } from '../../../core/services/admin/search.service';

=======
import { SearchComponent } from '../../../pages/admin/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b

@Component({
  selector: 'app-nav-bar',
  standalone: true,
<<<<<<< HEAD
  imports: [ReactiveFormsModule, RouterLink,MenuModule, ButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent { 
  
  opciones: MenuItem[] | undefined;
=======
  imports: [SearchComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
  formSearch = new FormGroup({
    search: new FormControl('')
  });

  constructor(private searchService: SearchService, private router: Router) {}

<<<<<<< HEAD
  ngOnInit(): void {
        this.opciones = [
            {
                label: 'Opciones',
                items: [
                    {
                      label: 'Configuracion',
                      icon: 'pi pi-cog',
                      

                    },
                    {
                        label: 'Cerrar Sesion',
                        icon: 'pi pi-sign-out',
                        routerLink: ['/login']
                    }
                    
                    //TODO: Aqui se pueden agregar mas opciones al menu desplegable del navbar 😁
                ]
            }
        ];
  }



=======
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
  onSubmit(): void {
    if(this.formSearch.value.search === '') {
      return;
    }

    const searchTerm = this.formSearch.value.search ?? 'No se envio nada';
    this.searchService.setSearchTerm(searchTerm);

    this.router.navigate(['/admin/search']);

    
<<<<<<< HEAD
  } 
=======
  }
>>>>>>> ec85abeaeaf8d3e0835d8d391920f6d6f7d5599b
}
