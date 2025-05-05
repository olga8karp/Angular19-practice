import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brewery } from '../models/brewery.model';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {
  private apiUrl = 'https://api.openbrewerydb.org/v1/breweries';

  constructor(private http: HttpClient) { }

  /**
   * Search breweries by city with pagination
   * @param city - City name to search for
   * @param page - Page number for pagination (default: 1)
   * @param perPage - Number of results per page (default: 10)
   * @returns Observable of Brewery array
   */
  searchBreweriesByCity(city: string, page: number = 1, perPage: number = 10): Observable<Brewery[]> {
    const params = this.buildParams({
      by_city: city,
      page: page.toString(),
      per_page: perPage.toString()
    });

    return this.http.get<Brewery[]>(this.apiUrl, { params });
  }

  /**
   * Build HttpParams object from a record of parameters
   * Handles null checks and empty values
   * @param paramsObj - Object containing parameter key-value pairs
   * @returns HttpParams object with non-null parameters
   */
  private buildParams(paramsObj: Record<string, string | undefined>): HttpParams {
    let params = new HttpParams();

    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value?.trim !== undefined && value?.trim() !== '') {
        params = params.set(key, value);
      }
    });

    return params;
  }
}
