// modal.service.ts
import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BreweryModalComponent } from './brewery-modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open(data: any): Promise<any> {
    const overlayRef = this.overlay.create({
      hasBackdrop: false
    });

    const portal = new ComponentPortal(BreweryModalComponent);
    const componentRef: ComponentRef<BreweryModalComponent> = overlayRef.attach(portal);

    componentRef.instance.brewery = data;

    return new Promise(resolve => {
      const sub = componentRef.instance.close.subscribe((result: any) => {
        overlayRef.dispose();
        sub.unsubscribe();
        resolve(result);
      });
    });
  }
}
