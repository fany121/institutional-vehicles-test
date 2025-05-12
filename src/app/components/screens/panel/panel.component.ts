import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

// Mis clases.

import { TypeToast } from '../../../enums/typeToast';
import { TypeForm } from '../../../enums/typeForm';

import { Response } from '../../../interfaces/response';
import { User } from '../../../interfaces/user';

import { HasRoleDirective } from '../../../directives/has-role/has-role.directive';

import { GlobalService } from '../../../services/global/global.service';
import { SessionService } from '../../../services/session/session.service';

import { FormUsersComponent } from '../users/form-users/form-users.component';

@Component({
  selector: 'app-panel',
  imports: [RouterOutlet, HasRoleDirective, NgClass],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})

/**
 * 
 * Componente que servirá para administrar el panel de control.
 * 
 */
export class PanelComponent implements OnInit, AfterViewInit {

  public year: number;
  public userId: number = 0;
  public userIdRole: number = 0;
  public userNameFull: string = '';
  public userNameShort: string = '';
  public userNameAbreviation: string = '';
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  @ViewChild('logo') logoElement!: ElementRef;

  /**
   * 
   * Configuración del componente.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * @param _sessionService Inyecta el servicio SessionService que realia peticiones a la API REST.
   * @param _router Inyecta el enrutador de Angular.
   * 
   */
  public constructor(
    private _globalService: GlobalService,
    private _sessionService: SessionService, 
    private _router: Router
  ) {
    this.year = this._globalService.getYear();
  }

  /**
   * 
   * Método de Angular.
   * Se ejecuta después de que Angular haya inicializado todas las propiedades del componente.
   * 
   */
  public ngOnInit(): void {
    const user: User | undefined = this._sessionService.getCurrentUser();

    if (user) {
      const name: Array<string> = user.full_name.split(' ');
      let shortName: string = '';
      let abreviationName: string = '';

      switch (name.length) {
        case 4:
        case 3:
          shortName = `${name[0]} ${name[2]}`;
          abreviationName = `${name[0].charAt(0)}${name[2].charAt(0)}`;
          break;
        case 2:
          shortName = `${name[0]} ${name[1]}`;
          abreviationName = `${name[0].charAt(0)}${name[1].charAt(0)}`;
          break;
        default:
          shortName = name[0];
          abreviationName = name[0].charAt(0);
          break;
      }

      this.userId = user.id_user;
      this.userIdRole = user.id_role;
      this.userNameFull = user.full_name;
      this.userNameShort = shortName;
      this.userNameAbreviation = abreviationName.toUpperCase();
    }
  }

  /**
   * 
   * Método de Angular.
   * Se ejecuta después de que la vista del componente se haya inicializado.	
   * 
   */
  public ngAfterViewInit(): void {
    if (this.logoElement && this._router.url === '/panel') {
      this.logoElement.nativeElement.classList.remove('blur');
    } else {
      this.logoElement.nativeElement.classList.add('blur');
    }

    this._globalService.setLogoElement(this.logoElement.nativeElement);
  }

  /**
   * 
   * Método para navegar a una ruta específica.
   * 
   * @param route Ruta.
   * 
   */
  public navigateTo(route: string): void {
    this._router.navigate(['panel', route]);
    if (window.innerWidth < 550) {
      this.toggleSidebar();
    }
  }

  /**
   * 
   * Método que restablece la contraseña del usuario.
   * 
   * @param user Usuario.
   * 
   */
  public goResetPassword(): void {
    const reference: unknown = this._globalService.showModal(FormUsersComponent);

    if (reference instanceof FormUsersComponent) {
      reference.typeForm = TypeForm.UPDATE_PASSWORD_ME;
      reference.id_user = this.userId;
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          this._globalService.closeModal();
        }
      });
    }
  }

  /**
   * 
   * Método para verificar si la ruta actual es la misma que la ruta pasada por parámetro.
   * 
   * @param route Ruta.
   * @returns Activo.
   * 
   */
  public isActive(route: string): boolean {
    return this._router.url === `/panel/${route}`;
  }

  /**
   * 
   * Método para mostrar u ocultar el sidebar.
   * 
   */
  public toggleSidebar(): void {
    if (this.sidebarElement) {
      this.sidebarElement.nativeElement.classList.toggle('close');
    }
  }

  /**
   * 
   * Método para cerrar la sesión del usuario.
   * 
   */
 public logout(): void {
  this._sessionService.logout().subscribe({
    next: (value: Response) => {
      if (value.code === 202) {
        this._sessionService.setCurrentUser(undefined);
        this._router.navigate(['/login']);
        this._globalService.showToast('Sesión', 'Sesión cerrada.', TypeToast.SUCCESS, 'checkmark-circle');
      } else {
        this._globalService.showToast('Sesión', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
      }
    },
    error: () => {
      this._globalService.showToast('Sesión', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
    }
  });
}


  /**
   * 
   * Método para descargar el manual de usuario.
   * 
   */
  public dowloadUserManual(): void {
    // switch (this.userIdRole) {
    //   case 1:
    //     window.open('https://drive.google.com/file/d/19l37skW8Ihd7Z3Tnh_tLbam7rItzImJ7/view?usp=sharing', '_blank');
    //     break;
    //   case 2:
    //     window.open('https://drive.google.com/file/d/11_hx8VwC2MXWUFDdWZhFNMzy1Akfa0T9/view?usp=sharing', '_blank');
    //     break;
    //   case 3:
    //     window.open('https://drive.google.com/file/d/1CoAkjaV45jxct8yIV88n5bHxoy5nTeBO/view?usp=sharing', '_blank');
    //     break;
    //   case 4:
    //     window.open('https://drive.google.com/file/d/1CoAkjaV45jxct8yIV88n5bHxoy5nTeBO/view?usp=sharing', '_blank');
    //     break;
    //   default:
    //     this._globalService.showToast('Manual', 'No se ha encontrado el manual.', TypeToast.DANGER, 'code-slash');
    //     break;
    // }
  }

}
