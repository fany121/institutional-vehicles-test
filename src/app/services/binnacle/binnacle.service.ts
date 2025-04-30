import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Mis clases.

import { Response } from '../../interfaces/response';
import { Binnacle } from '../../interfaces/binnacle';

import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})

/**
 * 
 * Servicio que servirá para la interacción con los registros de tipo
 * Bitácora (CREATE, READ, UPDATE y DELETE).
 * 
 */
export class BinnacleService {

  /**
   * 
   * Configuración del servicio.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * @param _http Inyecta el servicio de solicitudes HTTP de Angular.
   * 
   */
  public constructor(
    private _globalService: GlobalService, 
    private _http: HttpClient
  ) { }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Bitácora.
   * 
   * @returns Observable tipo Response, lista de registros tipo Bitácora.
   * 
   */
  public list(): Observable<Response> {
    let url: string = `${this._globalService.url}/binnacle/list`;

    return this._http.get<Response>(`${url}`, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la obtención de un registro de tipo Bitácora.
   * 
   * @param idBinnacle Identificador del ticket.
   * @returns Observable tipo Response, registro tipo Bitácora.
   * 
   */
  public read(idBinnacle: number): Observable<Response> {
    let url: string = `${this._globalService.url}/binnacle/read`;
    let params: string = `${idBinnacle}`;

    return this._http.get<Response>(`${url}/${params}`, {responseType: 'json'});
  }
  
}
