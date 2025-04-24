import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Brewery } from '../../services/brewery.service';
import {MatChip} from '@angular/material/chips';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-brewery-modal',
  templateUrl: './brewery-modal.component.html',
  imports: [
    MatChip,
    MatIconModule,
    MatIconButton,
    MatButton
  ],
  styles: [`
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }

    .avatar-chip {
      background-color: #EADDFF;
    }

    .modal {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      height: calc(100vh - 64px);
      background: white;
      padding: 1rem;
      border-radius: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      width: 100vw;
    }

    .modal-footer {
      position: fixed;
      bottom: 2rem;
      padding: 1rem;
      width: 100vw;
      display: flex;
      justify-content: center;
    }

    button[mat-raised-button] {;
      color: white;
      background-color: #65558F;
      border-radius: 9999px;
      width: 100%;
      margin: 0 auto;
    }
  `]
})
export class BreweryModalComponent {
  @Input() brewery!: Brewery;
  @Output() close = new EventEmitter<any>();

  onClose(result?: any) {
    this.close.emit(result);
  }
}
