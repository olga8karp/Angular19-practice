import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { City, CitiesService } from '../../services';

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
  cityControl = new FormControl<string | City | null>('');
  cities: City[] = [];
  filteredCities: Observable<City[]> | undefined;

  @Input() placeholder = 'Start typing a city name';
  @Input() label = 'Search for breweries by city';

  @Output() citySelected = new EventEmitter<string>();
  @Output() cityObjectSelected = new EventEmitter<City>();

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    // Load cities from the shared service
    this.citiesService.getCities().subscribe(cities => {
      this.cities = cities;

      // Initialize the filtered cities
      this.filteredCities = this.cityControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

    // When a city is selected, emit the city ID and the city object
    this.cityControl.valueChanges.subscribe((value: string | City | null) => {
      if (value && typeof value === 'object' && 'id' in value && value.id) {
        this.citySelected.emit(value.id);
        this.cityObjectSelected.emit(value);
      }
    });
  }

  /**
   * Converts a user-entered city name to the format used by the API
   * @param cityName The city name to convert
   * @returns The converted city name (lowercase with underscores)
   */
  convertCityName(cityName: string): string {
    return cityName.toLowerCase().replace(/\s+/g, '_');
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
      return this.cities;
    }

    const filterValue = typeof value === 'string'
      ? value.toLowerCase()
      : (value.name ? value.name.toLowerCase() : '');

    return this.cities.filter(city =>
      city.name.toLowerCase().includes(filterValue)
    );
  }
}
