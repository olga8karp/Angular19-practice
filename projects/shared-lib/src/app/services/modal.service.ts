import { Injectable } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ModalContentComponent, ModalData } from '../components/modal/modal-content/modal-content.component';
import { BasePortalOutlet } from '@angular/cdk/portal';

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
  constructor(private dialog: Dialog) {}

  /**
   * Opens a modal dialog with the specified content and options
   * @param data The data to pass to the modal
   * @param options Configuration options for the modal
   * @returns A reference to the dialog
   */
  openModal(data: ModalData, options: ModalOptions = {}) {
    const dialogConfig = new DialogConfig<unknown, DialogRef<unknown, ModalContentComponent>, BasePortalOutlet>();

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
        dialogConfig.height = 'calc(100% - 64px)'; // Subtract header height
        dialogConfig.maxWidth = '100%';
        dialogConfig.maxHeight = 'calc(100% - 64px)';
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

    return this.dialog.open<unknown, ModalData, ModalContentComponent>(ModalContentComponent, dialogConfig);
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
    return this.openModal(data, {
      ...options,
      size: ModalSize.FULLSCREEN,
      position: ModalPosition.BOTTOM,
      panelClass: 'fullscreen-modal'
    });
  }
}
