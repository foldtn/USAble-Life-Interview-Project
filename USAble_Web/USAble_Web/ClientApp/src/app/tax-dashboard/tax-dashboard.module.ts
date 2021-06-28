import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { TaxDashboardComponent } from './containers/taxes-dashboard/tax-dashboard.component';
import { TaxViewerComponent } from './containers/taxes-viewer/tax-viewer.component';

// Components
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';
import { TaxFormComponent } from './components/tax-form/tax-form.component';

// Services
import { TaxesDashboardService } from './taxes-dashboard.service';

import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role.enum';

const routes: Routes = [
  {
    path: 'taxes',
    children: [
      { path: '', component: TaxDashboardComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager]} },
      { path: ':id', component: TaxViewerComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager]} }
    ]
  }
];

@NgModule({
  declarations: [
    // Container Components
    TaxDashboardComponent,
    TaxViewerComponent,

    // Generic Components
    TaxDetailComponent,
    TaxFormComponent,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule.forChild (routes),
  ],
  providers: [
    TaxesDashboardService
  ]
})
export class TaxesDashboardModule {}
