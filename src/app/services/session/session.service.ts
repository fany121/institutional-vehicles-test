import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// Librerías externas.

import { CookieService } from 'ngx-cookie-service';
import { sha256 } from 'js-sha256';
import { JwtHelperService } from '@auth0/angular-jwt';

// Mis clases.

import { User } from '../../interfaces/user';
import { Response } from '../../interfaces/response';
import { Token } from '../../interfaces/token';

import { GlobalService } from '../global/global.service';
import { JWT } from '../../interfaces/jwt';

@Injectable({
  providedIn: 'root'
})

/**
 * 
 * Servicio que servirá para administrar la sesión activa.
 * 
 */
export class SessionService {

  private _currentUserSubject: BehaviorSubject<User | undefined>;

  /**
   * 
   * Configuración del servicio.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * @param _http Inyecta el servicio de solicitudes HTTP de Angular.
   * @param _cookieService Inyecta la librería que interactúa con cookies.
   * @param _jwtService Inyecta el servicio que decodifica tokens JWT.
   * 
   */
 public constructor(
    private _globalService: GlobalService, 
    private _http: HttpClient, 
    private _cookieService: CookieService,
    private _jwtService: JwtHelperService
  ) {
    
    if (this.getTokenVerification()) {
      const cookie: string | null = this.getTokenCookie();
      const object: Token | null = this.getTokenObject(cookie);
      const decoded: JWT | null = this.getTokenDecoded(object);

      this._currentUserSubject = new BehaviorSubject<User | undefined>({
        id_user: decoded!.id_user,
        full_name: decoded!.full_name,
        username: '',
        password: '',
        password_old: '',
        email: '',
        date_created: '',
        hash_username: decoded!.hash_username,
        hash_password: '',
        state: '',
        role: '',
        created_by: '',
        id_state: 0,
        id_role: decoded!.id_role,
        id_created_by: 0
      });
    } else {
      this._currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
    }
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, la existencia de un usuario, si lo encuentra
   * y sus credenciales son correctas, se creará una sesión activa.
   * 
   * @param user Usuario.
   * @returns Observable tipo Response, usuario activo.
   * 
   */
  public login(user: User): Observable<Response> {
    let url: string = `${this._globalService.url}/session/login`;

    let result: FormData = new FormData();
    result.append('username', sha256(user.username));
    result.append('password', sha256(user.password));

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }

  /**
   * 
   * Método que consulta a la API REST mediante petición HTTP, el cierre de sesión, esto
   * borrarña la sesión activa.
   * 
   * @returns Observable tipo Response, respuesta positiva (202) o negativa (400).
   * 
   */
  // public logout(): Observable<Response> {
  //   let url: string = `${this._globalService.url}/session/logout`;

  //   return this._http.get<Response>(url, {responseType: 'json'});
  // }
   public logout(): Observable<Response> {
    let url: string = `${this._globalService.url}/session/logout`;
    return this._http.get<Response>(url, { withCredentials: true });
  }

  /**
   * 
   * Método que obtiene, si existe, el valor del Observable de tipo Subject que almacena un usuario.
   * 
   * @returns Usuario o undefined dependiendo si hay o no una sesión activa.
   * 
   */
  public getCurrentUser(): User | undefined {
    return this._currentUserSubject.value;
  }

  /**
   * 
   * Método que establece, el valor del Observable de tipo Subject que almacena un usuario.
   * 
   * @param token JWT o undefined dependiendo si se quiere iniciar o borrar una sesión.
   * 
   */
 public setCurrentUser(token: Token | undefined): void {
    let result: User | undefined = undefined;
  
    if (token) {
      const decoded: JWT | null = this.getTokenDecoded(token);
  
      if (decoded) {
        result = {
          id_user: decoded.id_user,
          full_name: decoded.full_name,
          username: '',
          password: '',
          password_old: '',
          email: '',
          date_created: '',
          hash_username: decoded.hash_username,
          hash_password: '',
          state: '',
          role: '',
          created_by: '',
          id_state: 0,
          id_role: decoded.id_role,
          id_created_by: 0
        };
        this._cookieService.set('institutionalvehicles-user', JSON.stringify(token));
      }
    } else {
      this._cookieService.delete('institutionalvehicles-user');
    }
  
    this._currentUserSubject.next(result);
  }

  /**
   * 
   * Método que obtiene la cadena del token en las coockies.
   * 
   * @returns Cadena del token o null si no existe.
   * 
   */
  // public getTokenCookie(): string | null {
  //   return this._cookieService.check('institutionalvehicles-user') ? this._cookieService.get('institutionalvehicles-user') : null;
  // }

  /**
   * 
   * Método que obtiene el objeto del token en las coockies.
   * 
   * @param token Cadena del token.
   * @returns Token o null si no existe.
   * 
   */
  // public getTokenObject(token: string | null): Token | null {
  //   const json: JSON = token ? JSON.parse(token) : null;

  //   return json ? isToken(json) ? json : null : null;
  // }


  

  /**
   * 
   * Método que decodifica el token en las coockies.
   * 
   * @param token Token.
   * @returns JWT decodificado o null si no existe.
   *
   */
  public getTokenDecoded(token: Token | null): JWT | null {
    return token ? this._jwtService.decodeToken<JWT>(token.token) : null;
  }

  /**
   * 
   * Método que verifica si el token en las coockies es válido.
   * 
   * @returns Verdadero si es válido, falso si no lo es.
   * 
   */
  public getTokenVerification(): boolean {
    const cookie: string | null = this.getTokenCookie();
    const object: Token | null = this.getTokenObject(cookie);
    const decoded: JWT | null = this.getTokenDecoded(object);
    const expiration: boolean = object ? this._jwtService.isTokenExpired(object!.token) : true;

    return decoded != null && !expiration;
  }

  /**
   * 
   * Método que refresca el token para evitar que se cierre la sesión.
   * 
   * @returns Observable tipo Response, nuevo token.
   * 
   */
  public refreshToken(): Observable<Response> {
    let url: string = `${this._globalService.url}/session/refresh`;

    const currentUser: User = this.getCurrentUser()!;

    let result: FormData = new FormData();
    result.append('id_user', currentUser.id_user.toString());
    result.append('hash_username', currentUser.hash_username);
    result.append('full_name', currentUser.full_name);
    result.append('id_role', currentUser.id_role.toString());

    return this._http.post<Response>(`${url}`, result, {responseType: 'json'});
  }



  
  /**
   * Obtiene el token de la cookie.
   */
  public getTokenCookie(): string | null {
    return this._cookieService.check('institutionalvehicles-user') 
      ? this._cookieService.get('institutionalvehicles-user') 
      : null;
  }

  /**
   * Convierte el token almacenado en la cookie a un objeto Token si es válido.
   */
  public getTokenObject(token: string | null): Token | null {
    const json: any = token ? JSON.parse(token) : null;

    return json ? this.isToken(json) ? json : null : null;
  }

  /**
   * Verifica si un objeto es de tipo Token.
   */
  private isToken(object: any): object is Token {
    return object !== null && typeof object === 'object' && 'token' in object && 'token_refresh' in object;
  }
}

