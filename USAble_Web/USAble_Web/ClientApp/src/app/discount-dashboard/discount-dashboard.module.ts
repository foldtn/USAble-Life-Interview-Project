import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Containers
import { DiscountDashboardComponent } from './containers/discount-dashboard.component';

// Components
import { DiscountDetailComponent } from './components/discount-detail/discount-detail.component';
import { DiscountFormComponent, DiscountFormModalContent } from './components/discount-form/discount-form.component';

// Services
import { DiscountDashboardService } from './discount-dashboard.service';
import { HelperService } from '../services/helper.service';

import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role.enum';

const routes: Routes = [
  {
    path: 'discounts', component: DiscountDashboardComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager]}
  }
];

@NgModule({
  declarations: [
    // Container Components
    DiscountDashboardComponent,

    // Generic Components
    DiscountDetailComponent,
    DiscountFormComponent,
    DiscountFormModalContent,
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
    DiscountDashboardService,
    HelperService,
  ],
  entryComponents: [
    DiscountFormModalContent,
  ]
})
export class DiscountDashboardModule {}
