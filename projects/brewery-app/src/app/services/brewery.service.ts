import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state: string;
  county_province: string | null;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  updated_at: string;
  created_at: string;
}

export interface City {
  name: string; // Human readable city name
  id: string;   // Underscore-separated id for search
}

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
