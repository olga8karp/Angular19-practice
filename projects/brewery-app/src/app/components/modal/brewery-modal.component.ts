import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Brewery } from '../../services/brewery.service';
import { MatChip } from '@angular/material/chips';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-brewery-modal',
  templateUrl: './brewery-modal.component.html',
  imports: [
    MatChip,
    MatIconModule,
    MatIconButton,
    MatButton
  ],
  styleUrls: ['./brewery-modal.component.css']
})
export class BreweryModalComponent {
  @Input() brewery: Brewery | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
