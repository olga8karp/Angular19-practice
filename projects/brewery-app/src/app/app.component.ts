import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, CityInputComponent } from '../../../shared-lib/src/app/components';
import { BreweryService, Brewery } from './services/brewery.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, CityInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'brewery-app';
  breweries: Brewery[] = [];
  loading = false;
  noResults = false;

  constructor(private breweryService: BreweryService) {}

  onCitySelected(cityId: string) {
    this.loading = true;
    this.noResults = false;
    this.breweries = [];

    this.breweryService.searchBreweriesByCity(cityId).subscribe(
      (data) => {
        this.breweries = data;
        this.loading = false;
        this.noResults = data.length === 0;
      },
      (error) => {
        console.error('Error fetching breweries:', error);
        this.loading = false;
        this.noResults = true;
      }
    );
  }
}
