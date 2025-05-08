import { Component, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Librerías externas.

// import { NgxPaginationModule } from 'ngx-pagination';

// Mis clases.

import { TypeToast } from '../../../../enums/typeToast';
import { TypeForm } from '../../../../enums/typeForm';

import { Response } from '../../../../interfaces/response';
import { User } from '../../../../interfaces/user';
// import { Action } from '../../../../interfaces/actions';

import { HighlightPipe } from '../../../../pipes/highlight/highlight.pipe';
import { SearchUsersPipe } from '../../../../pipes/search/users/search-users.pipe';

import { HasRoleDirective } from '../../../../directives/has-role/has-role.directive';

// import { UsersDeleteComponent } from '../../../templates/users-delete/users-delete.component';
// import { UsersUpdateStateComponent } from '../../../templates/users-update-state/users-update-state.component';

import { GlobalService } from '../../../../services/global/global.service';
import { UsersService } from '../../../../services/users/users.service';

import { FormUsersComponent } from '../form-users/form-users.component';

@Component({
  selector: 'app-list-users',
  imports: [ FormsModule ],
  providers: [DatePipe],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})

/**
 * 
 * Componente que servirá para listar los usuarios registrados.
 * 
 */
export class ListUsersComponent  {


  
  

  
}
