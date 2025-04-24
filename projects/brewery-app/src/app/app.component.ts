import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, CityInputComponent, ModalContentComponent } from '../../../shared-lib/src/app/components';
import { BreweryService, Brewery } from './services/brewery.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {ModalService} from '../../../shared-lib/src/app/services';
import {BreweryModalComponent} from './components/modal/brewery-modal.component';

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
    BreweryModalComponent
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
    private breweryService: BreweryService,
    private modalService: ModalService
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

    this.breweryService.searchBreweriesByCity(this.currentCity, this.currentPage).subscribe(
      (data) => {
        this.breweries = [...this.breweries, ...data];
        this.loading = false;
        this.hasMoreItems = data.length === 10; // If we got 10 items, there might be more
      },
      (error) => {
        console.error('Error fetching more breweries:', error);
        this.loading = false;
        this.currentPage--; // Revert page increment on error
      }
    );
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
