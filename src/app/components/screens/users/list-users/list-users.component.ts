import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Librerías externas.

import { NgxPaginationModule } from 'ngx-pagination';

// Mis clases.

import { TypeToast } from '../../../../enums/typeToast';
import { TypeForm } from '../../../../enums/typeForm';

import { Response } from '../../../../interfaces/response';
import { User } from '../../../../interfaces/user';
import { Action } from '../../../../interfaces/actions';

import { HighlightPipe } from '../../../../pipes/highlight/highlight.pipe';
import { SearchUsersPipe } from '../../../../pipes/search/users/search-users.pipe';

import { HasRoleDirective } from '../../../../directives/has-role/has-role.directive';

import { UsersDeleteComponent } from '../../../templates/users-delete/users-delete.component';
import { UsersUpdateStateComponent } from '../../../templates/users-update-state/users-update-state.component';

import { GlobalService } from '../../../../services/global/global.service';
import { UsersService } from '../../../../services/users/users.service';

import { FormUsersComponent } from '../form-users/form-users.component';

@Component({
  selector: 'app-list-users',
  imports: [NgIf, NgFor, NgClass, FormsModule, NgxPaginationModule, SearchUsersPipe, HighlightPipe, HasRoleDirective],
  providers: [DatePipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})

/**
 * 
 * Componente que servirá para listar los usuarios registrados.
 * 
 */
export class ListUsersComponent implements OnInit {

  public title: string = 'USUARIOS';
  
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public limits: Array<number> = [2, 5, 10, 25];
  public isListActive: boolean = false;
  public filterSearch: string = '';

  public records: Array<User> = [];

  /**
   * 
   * Configuración del componente.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * @param _usersService Inyecta el servicio UsersService que realia peticiones a la API REST.
   * @param _datePipe Inyecta el servicio DatePipe de Angular.
   * 
   */
  public constructor(
    private _globalService: GlobalService, 
    private _usersService: UsersService, 
    private _datePipe: DatePipe
  ) { }

  /**
   * 
   * Método de Angular.
   * Se ejecuta después de que Angular haya inicializado todas las propiedades del componente.
   * 
   */
  public ngOnInit(): void {
    this._globalService.setLogoBlur(true);
    
    this.loadRecords();
  }

  /**
   * 
   * Método que carga los registros de la lista.
   * 
   */
  public loadRecords(): void {
    this._usersService.list().subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          this.records = value.data;
        } else if (value.code == 401) {
          this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
        } else {
          this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
        }
      },
      error: (error: any) => {
        console.error(error);
        this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
      }
    });
  }

  /**
   * 
   * Método que identifica cambios específicos en la lista
   * para no renderizar todo nuevamente sino solo los cambios 
   * detectados.
   * 
   * @param index Índice del elemento.
   * @param item Elemento.
   * @returns Identificador.
   * 
   */
  public recognize(index: number, item: User): number {
    return item.id_user;
  }

  /**
   * 
   * Método que calcula el índice de un elemento en paginación.
   * 
   * @param index Indice del elemento.
   * @returns Índice calculado.
   */
  public calculateIndex(index: number): number {
    return ((this.currentPage - 1) * this.itemsPerPage) + index + 1;
  }

  /**
   * 
   * Método que filtra los registros de la lista.
   * 
   * @param index Índice del elemento.
   * 
   */
  public toggleOptions(index: number): void {
    let element: HTMLElement | null = document.getElementById('option-' + index);

    if (element) {
      if (!element.classList.contains('active')) {
        const options = document.querySelectorAll('.option');
        options.forEach((option) => {
          option.classList.remove('active');
        });
      }
      
      element.classList.toggle('active');
    }
  }

  /**
   * 
   * Método que muestra u oculta el menú de paginación.
   * 
   */
  public togglePageMenu(): void {
    this.isListActive = !this.isListActive;
  }

  /**
   * 
   * Método que establece la cantidad de elementos por página.
   * 
   * @param itemsPerPage Cantidad de elementos por página.
   * 
   */
  public setItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.togglePageMenu();
  }

  /**
   * 
   * Método que actualiza la lista paginada.
   * 
   * @param newPage Nueva página.
   * 
   */
  public updatePaginatedRecords(newPage: number): void {
    this.currentPage = newPage;
  }

  /**
   * 
   * Método que devuelve las acciones por usuario.
   * 
   * @param record Usuario.
   * @returns Acciones.
   */
  public getActions(record: User): Array<Action> {
    return [
      { 
        id: 1, 
        title: 'Editar usuario', 
        icon: 'fa-pen', 
        roles: [1], 
        event: () => this.goUpdate(record)
      },
      { 
        id: 2, 
        title: 'Eliminar usuario', 
        icon: 'fa-trash', 
        roles: [1], 
        event: () => this.goDelete(record)
      },
      { 
        id: 3, 
        title: 'Restablecer contraseña', 
        icon: 'fa-key', 
        roles: [1], 
        event: () => this.goResetPassword(record)
      },
      { 
        id: 4, 
        title: 'Activar usuario', 
        icon: 'fa-unlock', 
        roles: [1], 
        condition: record.id_state == 0, 
        event: () => this.goUpdateState(record, 1)
      },
      { 
        id: 5, 
        title: 'Desactivar usuario', 
        icon: 'fa-lock', 
        roles: [1], 
        condition: record.id_state == 1, 
        event: () => this.goUpdateState(record, 0)
      },
      { 
        id: 6, 
        title: 'Ver usuario', 
        icon: 'fa-eye', 
        roles: [1], 
        event: () => this.goSee(record)
      }
    ];
  }

  /**
   * 
   * Método que formatea una fecha.
   * 
   * @param date Fecha.
   * @returns Cadena de texto con la fecha formateada.
   */
  public formatDate(date: string | null): string | null {
    return date != null ? this._datePipe.transform(date, this._globalService.dateFormat) : '';
  }

  /**
   * 
   * Método que redirige a la vista de creación de usuario.
   * 
   */
  public goCreate(): void {
    const reference: unknown = this._globalService.showModal(FormUsersComponent);

    if (reference instanceof FormUsersComponent) {
      reference.typeForm = TypeForm.CREATE;
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          this._globalService.closeModal();
          this.loadRecords();
        }
      });
    }
  }

  /**
   * 
   * Método que redirige a la vista de edición de usuario.
   * 
   * @param user Usuario.
   * 
   */
  public goUpdate(user: User): void {
    const reference: unknown = this._globalService.showModal(FormUsersComponent);

    if (reference instanceof FormUsersComponent) {
      reference.typeForm = TypeForm.UPDATE;
      reference.id_user = user.id_user;
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          this._globalService.closeModal();
          this.loadRecords();
        }
      });
    }
  }

  /**
   * 
   * Método que elimina un usuario.
   * 
   * @param user Usuario.
   * 
   */
  public goDelete(user: User): void {
    const reference: unknown = this._globalService.showModal(UsersDeleteComponent);

    if (reference instanceof UsersDeleteComponent) {
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          this._usersService.delete(user.id_user).subscribe({
            next: (value: Response) => {
              if (value.code == 202) {
                this._globalService.showToast(this.title, 'Usuario eliminado exitosamente.', TypeToast.SUCCESS, 'checkmark-circle');
                this.loadRecords();
              } else if (value.code == 401) {
                this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
              } else if (value.code == 1064) {
                this._globalService.showToast('Error', 'Este usuario no se debe eliminar, \nya que cuenta con registros en bitácora.', TypeToast.DANGER, 'alert-circle-outline');
              } else {
                this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
              }
            },
            error: (error: any) => {
              console.error(error);
              this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
            }
          });
        }

        this._globalService.closeModal();
      });
    }
  }

  /**
   * 
   * Método que restablece la contraseña de un usuario.
   * 
   * @param user Usuario.
   * 
   */
  public goResetPassword(user: User): void {
    const reference: unknown = this._globalService.showModal(FormUsersComponent);

    if (reference instanceof FormUsersComponent) {
      reference.typeForm = TypeForm.UPDATE_PASSWORD;
      reference.id_user = user.id_user;
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          this._globalService.closeModal();
        }
      });
    }
  }

  /**
   * 
   * Método que activa o desactiva un usuario.
   * 
   * @param user Usuario.
   * @param type Tipo de estado.
   * 
   */
  public goUpdateState(user: User, type: number): void {
    const reference: unknown = this._globalService.showModal(UsersUpdateStateComponent);

    if (reference instanceof UsersUpdateStateComponent) {
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          user.id_state = type;
          this._usersService.updateState(user).subscribe({
            next: (value: Response) => {
              if (value.code == 202) {
                this._globalService.showToast(this.title, 'Usuario actualizado exitosamente.', TypeToast.SUCCESS, 'checkmark-circle');
                this.loadRecords();
              } else if (value.code == 401) {
                this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
              } else {
                this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
              }
            },
            error: (error: any) => {
              console.error(error);
              this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
            }
          });
        }

        this._globalService.closeModal();
      });
    }
  }

  /**
   * 
   * Método que visualiza un usuario.
   * 
   * @param user Usuario.
   * 
   */
  public goSee(user: User): void {
    const reference: unknown = this._globalService.showModal(FormUsersComponent);

    if (reference instanceof FormUsersComponent) {
      reference.typeForm = TypeForm.READ;
      reference.id_user = user.id_user;
      reference.event.subscribe((response: boolean): void => {
        if (response) {
          this._globalService.closeModal();
        }
      });
    }
  }

}
