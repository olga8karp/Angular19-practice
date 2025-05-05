import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brewery } from '../models/brewery.model';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  private apiUrl = 'https://api.openbrewerydb.org/v1/breweries';

  constructor(private http: HttpClient) { }

  searchBreweriesByCity(city: string, page: number = 1): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(`${this.apiUrl}?by_city=${city}&per_page=10&page=${page}`);
  }
}
