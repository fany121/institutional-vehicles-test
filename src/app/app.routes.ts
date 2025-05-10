import { Routes } from '@angular/router';
// Mis clases.

import { authenticationGuard, authenticationGuardChild } from './guardians/authentication/authentication.guard';
import { roleAdministratorGuard } from './guardians/roles/role-administrator/role-administrator.guard';
import { roleUserGuard } from './guardians/roles/role-user/role-user.guard';
import { roleViewGuard } from './guardians/roles/role-view/role-view.guard';

import { SessionComponent } from './components/screens/session/session.component';
import { PanelComponent } from './components/screens/panel/panel.component';
import { ListVehiclesComponent } from './components/screens/vehicles/list-vehicles/list-vehicles.component';
import { FormVehiclesComponent } from './components/screens/vehicles/form-vehicles/form-vehicles.component';
import { FormUsersComponent } from './components/screens/users/form-users/form-users.component';
import { ListUsersComponent } from './components/screens/users/list-users/list-users.component';

// import { PanelComponent } from './components/screens/panel/panel.component';
// import { StatisticsComponent } from './components/screens/statistics/statistics.component';
// import { ListTicketsComponent } from './components/screens/tickets/list-tickets/list-tickets.component';
// import { ListUsersComponent } from './components/screens/users/list-users/list-users.component';
// import { FormUsersComponent } from './components/screens/users/form-users/form-users.component';
// import { FormTicketsComponent } from './components/screens/tickets/form-tickets/form-tickets.component';
// import { ReportTicketsComponent } from './components/screens/tickets/report-tickets/report-tickets.component';
// import { SupportComponent } from './components/screens/support/support.component';

// export const routes: Routes = [

//     { path: '', redirectTo: 'login', pathMatch: 'full' },
//     { path: 'login', component: SessionComponent },
//     { path: 'panel', component: PanelComponent },
//     { path: 'list-vehicles', component: ListVehiclesComponent },
//     { path: 'create-vehicles', component: FormVehiclesComponent },
    //crear usuario para el rol de administrador
//     { path: 'create-user', component:  FormUsersComponent },
//     { path: 'users', component:  ListUsersComponent },


//     { path: '**', redirectTo: 'login' }
    // { 
    //     path: 'panel', 
    //     component: PanelComponent,
    //     canActivate: [authenticationGuard],
    //     canActivateChild: [authenticationGuardChild],
    //     children: [
    //         { path: 'users', component: ListUsersComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'edit-user', component: FormUsersComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'create-user', component: FormUsersComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'see-user', component: FormUsersComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'reset-password', component: FormUsersComponent, canActivate: [roleAdministratorGuard] },

    //         { path: 'tickets', component: ListTicketsComponent },
    //         { path: 'my-tickets', component: ListTicketsComponent, canActivate: [roleTechnicianGuard] },
    //         { path: 'history', component: ListTicketsComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'edit-ticket', component: FormTicketsComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'create-ticket', component: FormTicketsComponent, canActivate: [roleAdministratorGuard] },
    //         { path: 'see-ticket', component: FormTicketsComponent },
    //         { path: 'report', component: ReportTicketsComponent, canActivate: [roleAdministratorGuard] },

    //         { path: 'statistics', component: StatisticsComponent, canActivate: [roleAdministratorGuard] }
    //     ]
    // },
    
// ];
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SessionComponent },

  {
    path: 'panel',
    component: PanelComponent,
    children: [
      
      { path: 'list-vehicles', component: ListVehiclesComponent },
      { path: 'create-vehicles', component: FormVehiclesComponent },
      { path: 'list-users', component: ListUsersComponent },
      { path: 'create-user', component: FormUsersComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

