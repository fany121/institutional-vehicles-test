import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


// Mis clases.

import { TypeToast } from '../../../enums/typeToast';

import { Response } from '../../../interfaces/response';

import { GlobalService } from '../../../services/global/global.service';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-session',
  imports: [ReactiveFormsModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {
  public title: string = 'SESIÓN';
  public form: FormGroup;
  public isLoading: boolean = false;


  
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    // if (this.form.valid) {
    //   const { username, password } = this.form.value;
    //   console.log('Formulario válido', username, password);
    //   // Redirigir a "panel" o simular login:
    //   // this._router.navigate(['/panel']);
    // } else {
    //   console.warn('Formulario inválido');
    //   this.form.markAllAsTouched();
    // }
  }
}
