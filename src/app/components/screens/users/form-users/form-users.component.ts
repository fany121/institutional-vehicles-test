import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

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
  imports: [ReactiveFormsModule],
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})

/**
 * 
 * Componente que servirá como formulario para usuarios.
 * 
 */
export class FormUsersComponent   {

}
