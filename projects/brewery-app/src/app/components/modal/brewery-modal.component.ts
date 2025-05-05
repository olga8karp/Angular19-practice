import { Component, input, output } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatList, MatListItem,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { Brewery } from '../../models/brewery.model';

@Component({
  selector: 'app-brewery-modal',
  templateUrl: './brewery-modal.component.html',
  imports: [
    MatChip,
    MatIconModule,
    MatIconButton,
    MatButton,
    MatList,
    MatListItemTitle,
    MatListItemLine,
    MatListItem
  ],
  styleUrls: ['./brewery-modal.component.css']
})
export class BreweryModalComponent {
  brewery = input<Brewery | null>(null);
  isOpen = input<boolean>(false);
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
