import { AfterViewInit, Component, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Mis clases.

import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

/**
 * 
 * Componente principal de todo proyecto Angular.
 * 
 */
export class AppComponent implements AfterViewInit {

  public title: string = 'Soporte Técnico';
  @ViewChild('toast') toastElement!: ElementRef;
  @ViewChild('toastProgress') toastProgressElement!: ElementRef;
  @ViewChild('modal') modalElement!: ElementRef;
  @ViewChild('modalContent', { read: ViewContainerRef, static: true }) modalContentElement!: ViewContainerRef;

  /**
   * 
   * Configuración del componente.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * 
   */
  public constructor(
    private _globalService: GlobalService
  ) { }

  /**
   * 
   * Método de Angular.
   * Se ejecuta después de que la vista del componente se haya inicializado.	
   * 
   */
  public ngAfterViewInit(): void {
    this._globalService.setToastElement(this.toastElement.nativeElement, this.toastProgressElement.nativeElement);
    this._globalService.setModalElement(this.modalElement.nativeElement, this.modalContentElement);
  }

  /**
   * 
   * Método que cierra el mensaje flotante.
   * 
   */
  public closeToast(): void {
    this._globalService.closeToast();
  }

  /**
   * 
   * Método que cierra el modal.
   * 
   */
  public closeModal(): void {
    this._globalService.closeModal();
  }

}
