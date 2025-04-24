import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  getBreweries(): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(this.apiUrl);
  }

  searchBreweriesByCity(city: string): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(`${this.apiUrl}?by_city=${city}&per_page=10`);
  }

  // Method to extract unique cities from all breweries
  getAllCities(): Observable<City[]> {
    // Get all breweries (this might need pagination for a real app with lots of data)
    return this.getBreweries().pipe(
      map(breweries => {
        // Extract unique cities
        const uniqueCities = new Map<string, City>();

        breweries.forEach(brewery => {
          if (brewery.city && !uniqueCities.has(brewery.city.toLowerCase())) {
            uniqueCities.set(brewery.city.toLowerCase(), {
              name: brewery.city, // Human readable name
              id: brewery.city.toLowerCase().replace(/\s+/g, '_') // Underscore-separated id
            });
          }
        });

        // Convert Map to array and sort alphabetically
        return Array.from(uniqueCities.values())
          .sort((a, b) => a.name.localeCompare(b.name));
      })
    );
  }
}
