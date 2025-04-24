import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalContentComponent, ModalData } from '../components/modal/modal-content/modal-content.component';

/**
 * Modal size options
 */
export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULLSCREEN = 'fullscreen'
}

/**
 * Modal position options
 */
export enum ModalPosition {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom'
}

/**
 * Modal configuration options
 */
export interface ModalOptions {
  size?: ModalSize;
  position?: ModalPosition;
  disableClose?: boolean;
  panelClass?: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  /**
   * Opens a modal dialog with the specified content and options
   * @param data The data to pass to the modal
   * @param options Configuration options for the modal
   * @returns A reference to the dialog
   */
  openModal(data: ModalData, options: ModalOptions = {}) {
    const dialogConfig = new MatDialogConfig();

    // Set default options
    const size = options.size || ModalSize.MEDIUM;
    const position = options.position || ModalPosition.CENTER;

    // Configure dialog based on size
    switch (size) {
      case ModalSize.SMALL:
        dialogConfig.width = '300px';
        dialogConfig.maxWidth = '90%';
        break;
      case ModalSize.MEDIUM:
        dialogConfig.width = '500px';
        dialogConfig.maxWidth = '90%';
        break;
      case ModalSize.LARGE:
        dialogConfig.width = '800px';
        dialogConfig.maxWidth = '90%';
        break;
      case ModalSize.FULLSCREEN:
        dialogConfig.width = '100%';
        dialogConfig.height = '100%'; // Full height of the screen
        dialogConfig.maxWidth = '100%';
        dialogConfig.maxHeight = '100%';
        break;
    }

    // Configure dialog based on position
    switch (position) {
      case ModalPosition.CENTER:
        // Default position is center
        break;
      case ModalPosition.TOP:
        dialogConfig.position = { top: '0', left: '0', right: '0' };
        break;
      case ModalPosition.BOTTOM:
        dialogConfig.position = { bottom: '0', left: '0', right: '0' };
        break;
    }

    // Set other options
    if (options.disableClose !== undefined) {
      dialogConfig.disableClose = options.disableClose;
    }

    if (options.panelClass) {
      dialogConfig.panelClass = options.panelClass;
    }

    // Set data
    dialogConfig.data = data;

    return this.dialog.open<ModalContentComponent, ModalData>(ModalContentComponent, dialogConfig);
  }

  /**
   * Opens a small modal dialog
   * @param data The data to pass to the modal
   * @param options Additional configuration options
   * @returns A reference to the dialog
   */
  openSmallModal(data: ModalData, options: Partial<ModalOptions> = {}) {
    return this.openModal(data, {
      ...options,
      size: ModalSize.SMALL
    });
  }

  /**
   * Opens a medium modal dialog
   * @param data The data to pass to the modal
   * @param options Additional configuration options
   * @returns A reference to the dialog
   */
  openMediumModal(data: ModalData, options: Partial<ModalOptions> = {}) {
    return this.openModal(data, {
      ...options,
      size: ModalSize.MEDIUM
    });
  }

  /**
   * Opens a large modal dialog
   * @param data The data to pass to the modal
   * @param options Additional configuration options
   * @returns A reference to the dialog
   */
  openLargeModal(data: ModalData, options: Partial<ModalOptions> = {}) {
    return this.openModal(data, {
      ...options,
      size: ModalSize.LARGE
    });
  }

  /**
   * Opens a full-screen modal dialog
   * @param data The data to pass to the modal
   * @param options Additional configuration options
   * @returns A reference to the dialog
   */
  openFullScreenModal(data: ModalData, options: Partial<ModalOptions> = {}) {
    const dialogConfig = new MatDialogConfig();

    // Set size to fullscreen
    dialogConfig.width = '100%';
    dialogConfig.height = 'calc(100% - 64px)'; // Full height minus header height
    dialogConfig.maxWidth = '100%';
    dialogConfig.maxHeight = 'calc(100% - 64px)';

    // Position below header
    dialogConfig.position = { top: '64px', left: '0', right: '0' };

    // Set panel class
    dialogConfig.panelClass = options.panelClass || 'fullscreen-modal';

    // Set data
    dialogConfig.data = data;

    return this.dialog.open<ModalContentComponent, ModalData>(ModalContentComponent, dialogConfig);
  }
}
