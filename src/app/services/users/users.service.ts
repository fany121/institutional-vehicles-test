import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Librerías externas.

import { sha256 } from 'js-sha256';

// Mis clases.

import { Response } from '../../interfaces/response';
import { User } from '../../interfaces/user';

import { GlobalService } from '../global/global.service';

@Injectable({
  providedIn: 'root'
})

/**
 * 
 * Servicio que servirá para la interacción con los registros de tipo
 * Usuario (CREATE, READ, UPDATE y DELETE).
 * 
 */
export class UsersService {

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
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Usuario.
   * 
   * @returns Observable tipo Response, lista de registros tipo Usuario.
   * 
   */
  public list(): Observable<Response> {
    let url: string = `${this._globalService.url}/users/list`;

    return this._http.get<Response>(`${url}`, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la lista de registros de tipo Usuario que son técnicos.
   * 
   * @returns Observable tipo Response, lista de registros tipo Usuario.
   * 
   */

  //no me sirve, talvez listar usuarios
  // public listTechnicians(): Observable<Response> {
  //   let url: string = `${this._globalService.url}/users/list-technicians`;

  //   return this._http.get<Response>(`${url}`, {responseType: 'json'});
  // }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la crearción de un registro nuevo de tipo Usuario.
   * 
   * @param user User.
   * @returns Observable tipo Response, respuesta afirmativa (202) o negativa (400).
   * 
   */
  public create(user: User): Observable<Response> {
    let url: string = `${this._globalService.url}/users/create`;

    let result: FormData = new FormData();
    result.append('full_name', user.full_name);
    result.append('username', user.username);
    result.append('email', user.email);
    result.append('hash_username', sha256(user.username));
    result.append('hash_password', sha256(user.password));
    result.append('id_state', '0');
    result.append('id_role', user.id_role.toString());
    result.append('id_created_by', user.id_created_by.toString());

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la obtención de un registro de tipo Usuario.
   * 
   * @param idUser Identificador del usuario.
   * @returns Observable tipo Response, registro tipo Usuario.
   * 
   */
  public read(idUser: number): Observable<Response> {
    let url: string = `${this._globalService.url}/users/read`;
    let params: string = `${idUser}`;

    return this._http.get<Response>(`${url}/${params}`, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la actualización de un registro de tipo Usuario.
   * 
   * @param user User.
   * @returns Observable tipo Response, respuesta afirmativa (202) o negativa (400).
   * 
   */
  public update(user: User): Observable<Response> {
    let url: string = `${this._globalService.url}/users/update`;

    let result: FormData = new FormData();
    result.append('id_user', user.id_user.toString());
    result.append('full_name', user.full_name);
    result.append('email', user.email);
    result.append('id_role', user.id_role.toString());

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la actualización de un registro de tipo Usuario.
   * 
   * @param user User.
   * @returns Observable tipo Response, respuesta afirmativa (202) o negativa (400).
   * 
   */
  public updatePassword(user: User): Observable<Response> {
    let url: string = `${this._globalService.url}/users/update-password`;

    let result: FormData = new FormData();
    result.append('id_user', user.id_user.toString());
    result.append('hash_password', sha256(user.password));
    result.append('hash_password_old', sha256(user.password_old));

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la actualización de un registro de tipo Usuario.
   * 
   * @param user User.
   * @returns Observable tipo Response, respuesta afirmativa (202) o negativa (400).
   * 
   */
  public updateState(user: User): Observable<Response> {
    let url: string = `${this._globalService.url}/users/update-state`;

    let result: FormData = new FormData();
    result.append('id_user', user.id_user.toString());
    result.append('id_state', user.id_state.toString());

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la eliminación de un registro de tipo Usuario.
   * 
   * @param idUser Identificador del usuario.
   * @returns Observable tipo Response, respuesta afirmativa (202) o negativa (400).
   * 
   */
  public delete(idUser: number): Observable<Response> {
    let url: string = `${this._globalService.url}/users/delete`;
    
    let result: FormData = new FormData();
    result.append('id_user', idUser.toString());

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }

}
