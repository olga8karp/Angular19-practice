import { Component, input, output } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Brewery } from '../../services/brewery.service';

@Component({
  selector: 'app-brewery-list',
  imports: [
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './brewery-list.component.html',
  styleUrl: './brewery-list.component.css'
})
export class BreweryListComponent {
  breweries = input<Brewery[]>([]);
  loading = input<boolean>(false);
  noResults = input<boolean>(false);
  hasMoreItems = input<boolean>(false);
  selectBrewery = output<Brewery>();
  loadMore = output<void>();

  showMoreInfo(brewery: Brewery): void {
    this.selectBrewery.emit(brewery);
  }

  loadMoreItems(): void {
   this.loadMore.emit();
  }
}
