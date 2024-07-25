import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor() {}

  setSearchTerm(term: string): void {
    console.log('ESTE ES EL TERMINO DE BUSQUEDA', term);
    return this.searchTermSubject.next(term);
  }

  getSearchTerm(): string {
    console.log('ESTE ES EL TERMINO DE BUSQUEDA', this.searchTermSubject.value);
    return this.searchTermSubject.value;
  }
}
