import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, CityInputComponent, ModalContentComponent } from '../../../shared-lib/src/app/components';
import { BreweryService, Brewery } from './services/brewery.service';
import { ModalService } from '../../../shared-lib/src/app/services';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    HeaderComponent,
    CityInputComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule
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

    // Create elements for the modal content
    const headerElement = document.createElement('div');
    headerElement.innerHTML = `<h2 style="margin: 0;">${brewery.name}</h2>`;

    const bodyElement = document.createElement('div');
    bodyElement.innerHTML = `
      <div class="brewery-details">
        <p><strong>Type:</strong> ${brewery.brewery_type}</p>
        ${brewery.street ? `<p><strong>Street:</strong> ${brewery.street}</p>` : ''}
        <p><strong>Location:</strong> ${brewery.city}, ${brewery.state} ${brewery.postal_code}</p>
        ${brewery.phone ? `<p><strong>Phone:</strong> ${brewery.phone}</p>` : ''}
        ${brewery.website_url ? `<p><strong>Website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>` : ''}
      </div>
    `;

    const footerElement = document.createElement('div');
    footerElement.innerHTML = `
      <button mat-raised-button color="primary" class="view-details-button">
        View details
      </button>
    `;

    // Open the modal
    const dialogRef = this.modalService.openFullScreenModal({
      headerContent: headerElement,
      bodyContent: bodyElement,
      footerContent: footerElement
    });

    // Add a class to the dialog for styling and add event listener to the button
    dialogRef.afterOpened().subscribe(() => {
      // Add styles to the button and add click event listener
      const buttons = document.querySelectorAll('.cdk-overlay-container .mat-dialog-container button');
      buttons.forEach(button => {
        if (button.textContent?.trim() === 'View details') {
          button.classList.add('view-details-button');
          button.addEventListener('click', () => {
            dialogRef.close();
          });
        }
      });
    });
  }
}
