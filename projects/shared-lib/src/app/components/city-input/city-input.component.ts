import { Component, OnInit, signal, Signal, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CitiesService } from '../../services';
import { City } from '../../models/city.model';

@Component({
  selector: 'lib-city-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './city-input.component.html',
  styleUrl: './city-input.component.css'
})
export class CityInputComponent implements OnInit {
  cities: Signal<City[]> = signal<City[]>([]);
  placeholder = input('Start typing a city name');
  label = input('Search for breweries by city');
  citySelected = output<string>();
  cityObjectSelected = output<City>();
  cityControl = new FormControl<string | City | null>('');
  filteredCities: Observable<City[]> | undefined;

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
      this.cities = this.citiesService.getCities();

      // Initialize the filtered cities
      this.filteredCities = this.cityControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    // When a city is selected, emit the city ID and the city object
    this.cityControl.valueChanges.subscribe((value: string | City | null) => {
      if (value && typeof value === 'object' && 'id' in value && value.id) {
        this.citySelected.emit(value.id);
        this.cityObjectSelected.emit(value);
      }
    });
  }

  /**
   * Display function for the autocomplete
   * @param city The city object to display
   * @returns The city name
   */
  displayFn = (city: City | null): string => {
    return city && city.name ? city.name : '';
  }

  /**
   * Filter function for the autocomplete
   * @param value The value to filter by
   * @returns Filtered array of cities
   */
  private _filter(value: string | City | null): City[] {
    if (!value) {
      return this.cities();
    }

    const filterValue = typeof value === 'string'
      ? value.toLowerCase()
      : (value.name ? value.name.toLowerCase() : '');

    return this.cities().filter(city =>
      city.name.toLowerCase().includes(filterValue)
    );
  }
}
