import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { UserViewerComponent } from './containers/user-viewer/user-viewer.component';
import { UserLoginComponent} from './containers/user-login/user-login.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';

// Components
import { UserDetailComponent } from './components/user-details/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormModalContent } from './components/user-form/user-form.component';
import { UserRemoveComponent } from './components/user-remove/user-remove.component';
import { UserRemoveConfirmationModalContent } from './components/user-remove/user-remove.component';
import { UserProfileFormComponent } from './components/user-profile/user-profile-form/user-profile-form.component';
import { UserProfilePasswordFormComponent } from './components/user-profile/user-profile-password-form/user-profile-password-form.component';

// Services
import { UserDashboardService } from './user-dashboard.service';

import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role.enum';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: UserDashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Manager]} },
      { path: ':id', component: UserViewerComponent, canActivate: [AuthGuard], data: { roles: [Role.Manager]} },
    ]
  },
  { path: 'login', component: UserLoginComponent },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  declarations: [
    // Container Components
    UserDashboardComponent,
    UserViewerComponent,
    UserLoginComponent,
    UserProfileComponent,

    // Generic Components
    UserDetailComponent,
    UserFormComponent,
    UserFormModalContent,
    UserRemoveComponent,
    UserRemoveConfirmationModalContent,
    UserProfileFormComponent,
    UserProfilePasswordFormComponent,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    UserDashboardService,
  ],
  entryComponents: [
    UserFormModalContent,
    UserRemoveConfirmationModalContent,
  ]
})
export class UserDashboardModule {}
