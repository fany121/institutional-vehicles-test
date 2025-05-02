import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// Mis clases.

import { Token } from '../../interfaces/token';
import { JWT } from '../../interfaces/jwt';

import { SessionService } from '../../services/session/session.service';

@Directive({
  selector: '[appHasRole]'
})

/**
 * 
 * Directiva que servirá para verificar si un usuario puede realizar
 * cierta acción mediante roles.
 * 
 */
export class HasRoleDirective {

  /**
   * 
   * Configuración de la directiva.
   * 
   * @param _sessionService Inyecta el servicio SessionService que realia peticiones a la API REST.
   * @param _templateReference Inyecta la representación de una plantilla de Angular.
   * @param _viewContainerReference Inyecta la representación de un contenedor de vista de Angular.
   * 
   */
  constructor(
    private _sessionService: SessionService, 
    private _templateReference: TemplateRef<any>,
    private _viewContainerReference: ViewContainerRef
  ) { }

  /**
   * 
   * Método set que evalua si el usuario posee un rol determinado.
   * 
   * @param value Rol a evaluar.
   */
  @Input()
  public set appHasRole(value: {roles: Array<number>}) {
    const cookie: string | null = this._sessionService.getTokenCookie();
    const object: Token | null = this._sessionService.getTokenObject(cookie);
    const decoded: JWT | null = this._sessionService.getTokenDecoded(object);
    
    if (decoded) {
      if (value.roles.includes(decoded.id_role)) {
        this._viewContainerReference.createEmbeddedView(this._templateReference);
      } else {
        this._viewContainerReference.clear();
      }
    } else {
      this._viewContainerReference.clear();
    }
  }

}
