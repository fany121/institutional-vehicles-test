import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

// // Mis clases.

// import { TypeToast } from '../../../enums/typeToast';

// import { Response } from '../../../interfaces/response';

// import { GlobalService } from '../../../services/global/global.service';
// import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-session',
  imports: [ReactiveFormsModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})

export class SessionComponent {

  public title: string = 'SESIÓN';

  public isLoading: boolean = false;
  public form: FormGroup;
  // public year: number;

  /**
   * 
   * Configuración del componente.
   * 
   * @param _globalService Inyecta el servicio GlobalService para obtener las configuraciones globales.
   * @param _sessionService Inyecta el servicio SessionService que realia peticiones a la API REST.
   * @param _router Inyecta el enrutador de Angular.
   * @param _formBuilder Inyecta el constructor de formularios de Angular.
   * 
   */
  public constructor(
    // private _globalService: GlobalService, 
    // private _sessionService: SessionService, 
    private _router: Router, 
    private _formBuilder: FormBuilder
  ) {
    this.form = _formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // this.year = this._globalService.getYear();

    // if (_sessionService.getCurrentUser()) {
    //   _router.navigate(['/panel']);
    // }
  }

  /**
   * 
   * Método que consulta al servicio SessionService la autenticación de un usuario
   * pasando el nombre de usuario y contraseña al mismo a la API REST.
   * Si todo sale bien guarda el usuario que ha iniciado sesíon y redirige al usuario 
   * a la ventana de Home.
   * 
   */
  public login(): void {
    // this.isLoading = true;

    // if (this.form.valid) {
    //   this._sessionService.login({
    //     id_user: 0,
    //     full_name: '',
    //     username: this.form.get('username')!.value,
    //     password: this.form.get('password')!.value,
    //     password_old: '',
    //     email: '',
    //     date_created: '',
    //     hash_username: '',
    //     hash_password: '',
    //     state: '',
    //     role: '',
    //     created_by: '',
    //     id_state: 0,
    //     id_role: 0,
    //     id_created_by: 0
    //   }).subscribe({
    //     next: (value: Response) => {
    //       if (value.code == 202) {
    //         this._sessionService.setCurrentUser(value.data);
    //         this._router.navigate(['/panel']);
    //         this._globalService.showToast(this.title, 'Inicio de sesión exitoso.', TypeToast.SUCCESS, 'checkmark-circle');
    //       } else if (value.code == 401) {
    //         this.isLoading = false;
    //         this._globalService.showToast(this.title, 'Usuario o contraseña incorreto, intente de nuevo.', TypeToast.DANGER, 'finger-print');
    //       } else {
    //         this.isLoading = false;
    //         this._globalService.showToast(this.title, 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
    //       }
    //     },
    //     error: (error: any) => {
    //       this.isLoading = false;
    //       this._globalService.showToast(this.title, 'Ha ocurrido un error.', TypeToast.DANGER, 'code-slash');
    //     }
    //   });
    // } else {
    //   Object.keys(this.form.controls).forEach((field: string) => {
    //     const control: AbstractControl<any, any> | null = this.form.get<string>(field);
    //     if (control && control.invalid) control.markAsTouched({ onlySelf: true });
    //   });

    //   this.isLoading = false;
    //   this._globalService.showToast(this.title, 'Formulario incompleto.', TypeToast.DANGER, 'code-slash');
    // }
  }

}
