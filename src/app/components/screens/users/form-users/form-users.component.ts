import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

// Librerías externas.

import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

// Mis clases.

import { TypeToast } from '../../../../enums/typeToast';
import { TypeForm } from '../../../../enums/typeForm';

import { Response } from '../../../../interfaces/response';
import { Role } from '../../../../interfaces/role';
import { User } from '../../../../interfaces/user';

import { GlobalService } from '../../../../services/global/global.service';
import { SessionService } from '../../../../services/session/session.service';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'app-form-users',
  imports: [ReactiveFormsModule, NgSelectComponent, NgSelectModule, NgFor, NgIf, NgClass],
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})

/**
 * 
 * Componente que servirá como formulario para usuarios.
 * 
 */
export class FormUsersComponent implements OnInit {

  public title: string = 'AGREGAR USUARIO';

  public isLoading: boolean = false;
  public typeForm: TypeForm = TypeForm.CREATE;
  public form: FormGroup;

  public id_user: number = 0;
  public selectedRole: Role | undefined;

  public roles: Array<Role> = [];

  public event: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * 
   * Configuración del componente.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * @param _sessionService Inyecta el servicio SessionService que realia peticiones a la API REST.
   * @param _usersService Inyecta el servicio UsersService que realia peticiones a la API REST.
   * @param _formBuilder Inyecta el constructor de formularios de Angular.
   * 
   */
  constructor(
    private _globalService: GlobalService,
    private _sessionService: SessionService,  
    private _usersService: UsersService, 
    private _formBuilder: FormBuilder
  ) {
    this.form = _formBuilder.group({
      full_name: ['', Validators.required],
      user: ['', Validators.required],
      password_current: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id_role: [undefined, Validators.required],
    }, { validators: [this._validatePasswordConfirmation()] });
  }

  /**
   * 
   * Método de Angular.
   * Se ejecuta después de que Angular haya inicializado todas las propiedades del componente.
   * 
   */
  public ngOnInit(): void {
    this.loadRoles();

    if (this.typeForm == TypeForm.CREATE) {
      this.title = 'AGREGAR USUARIO';
      this.form.removeControl('password_current');
    }

    if (this.typeForm == TypeForm.UPDATE) {
      this.title = 'EDITAR USUARIO';
      this.readUser();
    }

    if (this.typeForm == TypeForm.UPDATE_PASSWORD_USER) {
      this.title = 'RESTABLECER CONTRASEÑA';

      this.readUser();
    }

    if (this.typeForm == TypeForm.UPDATE_PASSWORD_ME) {
      this.title = 'RESTABLECER MI CONTRASEÑA';

      this.readUser();
    }

    if (this.typeForm == TypeForm.READ) {
      this.title = 'VER USUARIO';

      this.readUser();
      this.form.disable();
    }
  }

  /**
   * 
   * Método que carga la lista de Roles.
   * 
   */
  public loadRoles(): void {
    this._globalService.listRoles().subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          this.roles = value.data;
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
   * Método que guarda un usuario.
   * 
   */
  public saveUser(): void {
    if (this.form.valid) {
      this.isLoading = true;
      switch (this.typeForm) {
        case TypeForm.CREATE:
          this.createUser();
          break;
        case TypeForm.UPDATE:
          this.updateUser();
          break;
        case TypeForm.UPDATE_PASSWORD_USER:
          this.updateUserPasswordUser();
          break;
        case TypeForm.UPDATE_PASSWORD_ME:
          this.updateUserPasswordMe();
          break;
        default:
          this.isLoading = false;
          break;
      }
    } else {
      Object.keys(this.form.controls).forEach((field: string) => {
        const control: AbstractControl<any, any> | null = this.form.get<string>(field);
        if (control && control.invalid) control.markAsTouched({ onlySelf: true });
      });

      this.isLoading = false;
      this._globalService.showToast(this.title, 'Formulario incompleto.', TypeToast.DANGER, 'code-slash');
    }
  }

  /**
   * 
   * Método que consulta un usuario.
   * 
   */
  public readUser(): void {
    this._usersService.read(this.id_user).subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          const user: User = value.data[0];

          this.form.patchValue({
            full_name: user.full_name,
            user: user.username,
            email: user.email,
            id_role: user.id_role
          });

          this.form.removeControl('user');
          
          if (this.typeForm == TypeForm.READ) {
            this.form.removeControl('password_current');
            this.form.removeControl('password');
            this.form.removeControl('password_confirmation');
          }

          if (this.typeForm == TypeForm.UPDATE) {
            this.form.removeControl('password_current');
            this.form.removeControl('password');
            this.form.removeControl('password_confirmation');
          }

          if (this.typeForm == TypeForm.UPDATE_PASSWORD_USER) {
            this.form.removeControl('full_name');
            this.form.removeControl('password_current');
            this.form.removeControl('email');
            this.form.removeControl('id_role');
          }

          if (this.typeForm == TypeForm.UPDATE_PASSWORD_ME) {
            this.form.removeControl('full_name');
            this.form.removeControl('email');
            this.form.removeControl('id_role');
          }
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
   * Método que crea un usuario.
   * 
   */
  public createUser(): void {
    this._usersService.create({
      id_user: 0,
      full_name: this.form.get('full_name')!.value,
      username: this.form.get('user')!.value,
      password: this.form.get('password')!.value,
      password_old: '',
      email: this.form.get('email')!.value,
      date_created: '',
      hash_username: '',
      hash_password: '',
      state: '',
      role: '',
      created_by: '',
      id_state: 0,
      id_role: this.form.get('id_role')!.value,
      id_created_by: this._sessionService.getCurrentUser()!.id_user
    }).subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          this.decline();
          this._globalService.showToast(this.title, 'Usuario creado exitosamente.', TypeToast.SUCCESS, 'checkmark-circle');
        } else if (value.code == 401) {
          this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
        } else {
          this.isLoading = false;
          this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
        }
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
        this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
      }
    });
  }

  /**
   * 
   * Método que actualiza un usuario.
   * 
   */
  public updateUser(): void {
    this._usersService.update({
      id_user: this.id_user,
      full_name: this.form.get('full_name')!.value,
      username: '',
      password: '',
      password_old: '',
      email: this.form.get('email')!.value,
      date_created: '',
      hash_username: '',
      hash_password: '',
      state: '',
      role: '',
      created_by: '',
      id_state: 0,
      id_role: this.form.get('id_role')!.value,
      id_created_by: this._sessionService.getCurrentUser()!.id_user
    }).subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          this.decline();
          this._globalService.showToast(this.title, 'Usuario actualizado exitosamente.', TypeToast.SUCCESS, 'checkmark-circle');
        } else if (value.code == 401) {
          this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
        } else {
          this.isLoading = false;
          this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
        }
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
        this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
      }
    });
  }

  /**
   * 
   * Método que actualiza la contraseña de un usuario.
   * 
   */
  public updateUserPasswordUser(): void {
    this._usersService.updatePasswordUser({
      id_user: this.id_user,
      full_name: '',
      username: '',
      password: this.form.get('password')!.value,
      password_old: '',
      email: '',
      date_created: '',
      hash_username: '',
      hash_password: '',
      state: '',
      role: '',
      created_by: '',
      id_state: 0,
      id_role: 0,
      id_created_by: this._sessionService.getCurrentUser()!.id_user
    }).subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          this.decline();
          this._globalService.showToast(this.title, 'Contraseña de usuario actualizada exitosamente.', TypeToast.SUCCESS, 'checkmark-circle');
        } else if (value.code == 401) {
          this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
        } else {
          this.isLoading = false;
          this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
        }
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
        this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
      }
    });
  }

  /**
   * 
   * Método que actualiza la contraseña del usuario.
   * 
   */
  public updateUserPasswordMe(): void {
    this._usersService.updatePasswordMe({
      id_user: this.id_user,
      full_name: '',
      username: '',
      password: this.form.get('password')!.value,
      password_old: this.form.get('password_current')!.value,
      email: '',
      date_created: '',
      hash_username: '',
      hash_password: '',
      state: '',
      role: '',
      created_by: '',
      id_state: 0,
      id_role: 0,
      id_created_by: this._sessionService.getCurrentUser()!.id_user
    }).subscribe({
      next: (value: Response) => {
        if (value.code == 202) {
          this.decline();
          this._globalService.showToast(this.title, 'Contraseña actualizada exitosamente.', TypeToast.SUCCESS, 'checkmark-circle');
        } else if (value.code == 403) {
          this.isLoading = false;
          this._globalService.showToast('Error', 'La contraseña actual es incorrecta.', TypeToast.DANGER, 'code-slash');
        } else if (value.code == 401) {
          this._globalService.showToast('Error', 'Sesión finalizada.', TypeToast.DANGER, 'code-slash');
        } else {
          this.isLoading = false;
          this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
        }
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
        this._globalService.showToast('Error', 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
      }
    });
  }

  /**
   * 
   * Método que escucha los cambios en el campo Rol.
   * 
   * @param idRole Índice del registro en la lista.
   */
  public onChangeSelectRole(idRole: number): void {
    this.form.get('id_role')!.setValue(idRole);
    this.selectedRole = this.roles.find((role: Role) => role.id_role == idRole);
  }

  /**
   * 
   * Método que limpia el campo Rol.
   * 
   */
  public onClearSelectRole(): void {
    this.selectedRole = undefined;
    this.form.get('id_role')!.setValue('');
  }

  /**
   * 
   * Método que valida la confirmación de la contraseña.
   * 
   * @returns Validador de campo.
   * 
   */
  private _validatePasswordConfirmation(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password: string = group.get('password')?.value;
      const passwordConfirmation: string = group.get('password_confirmation')?.value;

      if (!passwordConfirmation) {
        return { 'passwordEmpty': true };
      }

      if (password != passwordConfirmation) {
        return { 'passwordConfirmation': true };
      }

      return null;
    };
  }

  /**
   * 
   * Método que declina la acción sobre el registro.
   * 
   */
  public decline(): void {
    this.event.emit(true);
  }

}
