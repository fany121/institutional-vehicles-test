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
export class AppComponent implements AfterViewInit {
  // Este método es requerido por la interfaz AfterViewInit
  public title: string = 'Vehiculos Institucionales';
  @ViewChild('toast') toastElement!: ElementRef;
  @ViewChild('toastProgress') toastProgressElement!: ElementRef;
  @ViewChild('modal') modalElement!: ElementRef;
  @ViewChild('modalContent') modalContentElement!: ElementRef;

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

  public ngAfterViewInit(): void {
    if (
      this.toastElement &&
      this.toastProgressElement &&
      this.modalElement &&
      this.modalContentElement
    ) {
      this._globalService.setToastElement(
        this.toastElement.nativeElement,
        this.toastProgressElement.nativeElement
      );
      this._globalService.setModalElement(
        this.modalElement.nativeElement,
        this.modalContentElement.nativeElement
      );
    } else {
      console.warn('Algún elemento no fue encontrado en el DOM');
    }
  }
   /**
   * 
   * Método que cierra el mensaje flotante.
   * 
   */
   public closeToast(): void {
    // this._globalService.closeToast();
  }
/**
   * 
   * Método que cierra el modal.
   * 
   */
  public closeModal(): void {
    // this._globalService.closeModal();
  }
}

/**
 * 
 * Componente principal de todo proyecto Angular.
 * 
 */