import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Containers
import { DiscountsComponent } from './containers/discounts/discounts.component';
import { MenuItemsComponent } from './containers/menu-items/menu-items.component';
import { MenuItemCategoriesComponent } from './containers/menu-item-categories/menu-item-categories.component';
import { PlaceOrderComponent } from './containers/place-order/place-order.component';
import { ViewOrdersComponent } from './containers/view-orders/view-orders.component';

// Components

// Services
import { MenuDashboardService } from './menu-dashboard.service';

import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role.enum';

const routes: Routes = [
  // Server & Manager Roles
  { path: 'placeOrder', component: PlaceOrderComponent, canActivate: [AuthGuard], data: { roles: [Role.Server, Role.Manager] } },
  { path: 'viewOrders', component: ViewOrdersComponent, canActivate: [AuthGuard], data: { roles: [Role.Server, Role.Manager] } },

  // Manager Roles
  { path: 'menuItems', component: MenuItemsComponent, canActivate: [AuthGuard], data: { roles: [Role.Manager]} },
  { path: 'menuItemCategories', component: MenuItemCategoriesComponent, canActivate: [AuthGuard], data: { roles: [Role.Manager]} },
  { path: 'discounts', component: DiscountsComponent, canActivate: [AuthGuard], data: { roles: [Role.Manager]} },
];

@NgModule({
  declarations: [
    // Container Components
    DiscountsComponent,
    MenuItemsComponent,
    MenuItemCategoriesComponent,
    PlaceOrderComponent,
    ViewOrdersComponent,

    // Generic Components
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    RouterModule.forChild (routes),
  ],
  providers: [
    MenuDashboardService,
  ]
})
export class MenuDashboardModule {}
