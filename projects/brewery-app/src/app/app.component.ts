import { Component, inject, OnDestroy, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputComponent, HeaderComponent } from '../../../shared-lib/src/app/components';
import { BreweryService } from './services/brewery.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { BreweryModalComponent } from './components/modal/brewery-modal.component';
import { BreweryListComponent } from './components/brewery-list/brewery-list.component';
import { Brewery } from './models/brewery.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';

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
    BreweryListComponent,
    PortalModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnDestroy {
  title = 'brewery-app';
  breweries: Brewery[] = [];
  loading = false;
  noResults = false;
  currentPage = 1;
  currentCity = '';
  hasMoreItems = false;
  selectedBrewery: Brewery | null = null;
  isModalOpen = false;
  overlay = inject<Overlay>(Overlay);
  breweryService = inject(BreweryService);
  portal = viewChild(CdkPortal);
  private overlayRef: OverlayRef | null = null;

  onCitySelected(cityId: string) {
    this.loading = true;
    this.noResults = false;
    this.breweries = [];
    this.currentPage = 1;
    this.currentCity = cityId;

    this.breweryService.searchBreweriesByCity(cityId, this.currentPage).subscribe({
      next: (data) => {
        this.breweries = data;
        this.noResults = data.length === 0;
        this.hasMoreItems = data.length === 10; // If we got 10 items, there might be more
      },
      error: (error) => {
        console.error('Error fetching breweries:', error);
        this.noResults = true;
        this.hasMoreItems = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  loadMore() {
    if (!this.currentCity || this.loading || !this.hasMoreItems) return;

    this.loading = true;
    this.currentPage++;

    this.breweryService.searchBreweriesByCity(this.currentCity, this.currentPage).subscribe({
      next: (data) => {
        this.breweries = [...this.breweries, ...data];
        this.hasMoreItems = data.length === 10; // If we got 10 items, there might be more
      },
      error: (error) => {
        console.error('Error fetching more breweries:', error);
        this.currentPage--;
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

    // Create the overlay if it doesn't exist
    if (!this.overlayRef) {
      const positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();

      this.overlayRef = this.overlay.create({
        positionStrategy,
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.block()
      });
    }

    // Attach the portal to the overlay
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal());
    }
  }

  closeModal() {
    this.isModalOpen = false;

    // Detach the portal from the overlay
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  ngOnDestroy() {
    // Clean up the overlay when the component is destroyed
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
