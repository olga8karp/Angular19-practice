import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, CityInputComponent } from '../../../shared-lib/src/app/components';
import { BreweryService, Brewery } from './services/brewery.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { BreweryModalComponent } from './components/modal/brewery-modal.component';
import {BreweryListComponent} from './components/brewery-list/brewery-list.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HeaderComponent,
    CityInputComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BreweryModalComponent,
    BreweryListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'brewery-app';
  breweries: Brewery[] = [];
  loading = false;
  noResults = false;
  currentPage = 1;
  currentCity = '';
  hasMoreItems = false;
  selectedBrewery: Brewery | null = null;
  isModalOpen = false;

  constructor(
    private breweryService: BreweryService
  ) {}

  onCitySelected(cityId: string) {
    this.loading = true;
    this.noResults = false;
    this.breweries = [];
    this.currentPage = 1;
    this.currentCity = cityId;

    this.breweryService.searchBreweriesByCity(cityId, this.currentPage).subscribe(
      (data) => {
        this.breweries = data;
        this.loading = false;
        this.noResults = data.length === 0;
        this.hasMoreItems = data.length === 10; // If we got 10 items, there might be more
      },
      (error) => {
        console.error('Error fetching breweries:', error);
        this.loading = false;
        this.noResults = true;
        this.hasMoreItems = false;
      }
    );
  }

  loadMore() {
    if (!this.currentCity || this.loading || !this.hasMoreItems) return;

    this.loading = true;
    this.currentPage++;

    this.breweryService.searchBreweriesByCity(this.currentCity, this.currentPage).subscribe({
      next: (data) => {
        this.breweries = [...this.breweries, ...data];
        this.loading = false;
        this.hasMoreItems = data.length === 10; // If we got 10 items, there might be more
      },
      error: (error) => {
        console.error('Error fetching more breweries:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  showMoreInfo(brewery: Brewery) {
    this.selectedBrewery = brewery;
    console.log('Show more info for:', brewery.name);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
