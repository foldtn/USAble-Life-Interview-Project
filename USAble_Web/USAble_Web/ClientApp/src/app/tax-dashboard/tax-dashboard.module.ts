import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Containers
import { TaxDashboardComponent } from './containers/taxes-dashboard/tax-dashboard.component';

// Components
import { TaxDetailComponent } from './components/tax-detail/tax-detail.component';
import { TaxFormComponent, TaxFormModalContent } from './components/tax-form/tax-form.component';

// Services
import { TaxDashboardService } from './tax-dashboard.service';
import { HelperService } from '../services/helper.service';

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
    TaxFormComponent,
    TaxFormModalContent,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild (routes),
  ],
  providers: [
    TaxDashboardService,
    HelperService,
  ],
  entryComponents: [
    TaxFormModalContent,
  ]
})
export class TaxDashboardModule {}
