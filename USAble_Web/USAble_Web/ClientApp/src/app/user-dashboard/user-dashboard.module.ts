import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { UserDashboardComponent } from './containers/user-dashboard/user-dashboard.component';
import { UserViewerComponent } from './containers/user-viewer/user-viewer.component';
import { UserLoginComponent} from './containers/user-login/user-login.component';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';

// Components
import { UserDetailComponent } from './components/user-details/user-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';

// Services
import { UserDashboardService } from './user-dashboard.service';

import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: UserDashboardComponent, canActivate: [AuthGuard] },
      { path: ':id', component: UserViewerComponent, canActivate: [AuthGuard] },
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
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule.forChild (routes),
  ],
  providers: [
    UserDashboardService,
  ]
})
export class UserDashboardModule {}
