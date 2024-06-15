import { Component } from '@angular/core';
import { SearchComponent } from '../../../pages/admin/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [SearchComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  formSearch = new FormGroup({
    search: new FormControl('')
  });

  constructor(private searchService: SearchService, private router: Router) {}

  onSubmit(): void {
    if(this.formSearch.value.search === '') {
      return;
    }

    const searchTerm = this.formSearch.value.search ?? 'No se envio nada';
    this.searchService.setSearchTerm(searchTerm);

    this.router.navigate(['/admin/search']);

    
  }
}
