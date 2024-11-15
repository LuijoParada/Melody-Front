// services/convertion/musictopartiture-aux.service.ts
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { AlertComponent } from '../misc/alert/alert.component'; // Ruta actualizada

@Injectable({
  providedIn: 'root'
})
export class MusictopartitureAuxService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showAlertAt(element: HTMLElement) {
    // Crear el componente
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = componentFactory.create(this.injector);

    // Adjuntar el componente a la vista del Angular
    this.appRef.attachView(componentRef.hostView);

    // Añadir el componente al DOM en la posición deseada
    element.appendChild((componentRef.hostView as any).rootNodes[0]);
  }
  deleteAlert(element: HTMLElement) {
    // Eliminar el componente del DOM
    
    element.removeChild(element.childNodes[0]);
  }

}
