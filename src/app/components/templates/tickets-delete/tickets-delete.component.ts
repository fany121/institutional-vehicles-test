import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tickets-delete',
  imports: [],
  templateUrl: './tickets-delete.component.html',
  styleUrl: './tickets-delete.component.css'
})

/**
 * 
 * Componente que se encarga de mostrar un dialogo para cambiar el estado de un registro.
 * 
 */
export class TicketsDeleteComponent {

  public event: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * 
   * Constructor del componente.
   * 
   */
  public constructor() { }

  /**
   * 
   * Método que declina la acción sobre el registro.
   * 
   */
  public decline(): void {
    this.event.emit(false);
  }

  /**
   * 
   * Método que confirma la ación sobre el registro.
   * 
   */
  public confirm(): void {
    this.event.emit(true);
  }

}
