import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { TaxDashboardComponent } from './containers/taxes-dashboard/tax-dashboard.component';

// Components
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';

// Services
import { TaxDashboardService } from './tax-dashboard.service';

import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role.enum';

const routes: Routes = [
  {
    path: 'taxes',
    children: [
      { path: '', component: TaxDashboardComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager]} }
    ]
  }
];

@NgModule({
  declarations: [
    // Container Components
    TaxDashboardComponent,

    // Generic Components
    TaxDetailComponent,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule.forChild (routes),
  ],
  providers: [
    TaxDashboardService
  ]
})
export class TaxDashboardModule {}
