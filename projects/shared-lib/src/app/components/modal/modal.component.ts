import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';

  close(): void {
    this.isOpen = false;
  }

  open(): void {
    this.isOpen = true;
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
