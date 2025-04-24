import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';

export interface ModalData {
  headerContent: HTMLElement;
  bodyContent: HTMLElement;
  footerContent: HTMLElement;
}

@Component({
  selector: 'lib-modal-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div class="mat-dialog-header" [innerHTML]="headerHtml"></div>
    <div class="mat-dialog-content" [innerHTML]="bodyHtml"></div>
    <div class="mat-dialog-footer" [innerHTML]="footerHtml"></div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .mat-dialog-header {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .mat-dialog-content {
      padding: 16px;
      overflow-y: auto;
      flex: 1;
    }

    .mat-dialog-footer {
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: center;
      margin-top: auto;
    }
  `]
})
export class ModalContentComponent {
  headerHtml: string;
  bodyHtml: string;
  footerHtml: string;

  constructor(
    public dialogRef: MatDialogRef<ModalContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {
    this.headerHtml = data.headerContent ? data.headerContent.innerHTML : '';
    this.bodyHtml = data.bodyContent ? data.bodyContent.innerHTML : '';
    this.footerHtml = data.footerContent ? data.footerContent.innerHTML : '';
  }

  close(): void {
    this.dialogRef.close();
  }
}
