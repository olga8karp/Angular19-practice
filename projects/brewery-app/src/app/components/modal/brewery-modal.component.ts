import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brewery } from '../../services/brewery.service';
import { MatChip } from '@angular/material/chips';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatList, MatListItem,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';

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
  @Input() brewery: Brewery | null = null;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
