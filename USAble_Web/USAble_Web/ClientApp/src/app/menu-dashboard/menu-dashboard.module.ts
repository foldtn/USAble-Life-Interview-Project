import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Containers
import { MenuDashboardComponent } from './containers/menu-dashboard/menu-dashboard.component';
import { MenuItemsComponent } from './containers/menu-items/menu-items.component';
import { MenuItemCategoriesComponent } from './containers/menu-item-categories/menu-item-categories.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { PlaceOrderComponent } from './containers/orders/place-order/place-order.component';
import { ViewOrderComponent } from './containers/orders/view-order/view-order.component';

// Components
import { CategoryDetailComponent } from './components/menu-item-categories/category-detail/category-detail.component';
import { CategoryFormComponent, CategoryFormModalContent } from './components/menu-item-categories/category-form/category-form.component';
import { MenuItemDetailComponent } from './components/menu-items/menu-item-detail/menu-item-detail.component';
import { MenuItemFormComponent, MenuItemFormModalContent } from './components/menu-items/menu-item-form/menu-item-form.component';
import { MenuDetailComponent } from './components/menu-dashboard/menu-detail.component';
import { OrderItemDetailComponent } from './components/orders/order-item-detail/order-item-detail.component';
import { OrderSummaryComponent } from './components/orders/order-summary/order-summary.component';

// Services
import { MenuItemsService } from './services/menu-items.service';
import { MenuItemCategoriesService } from './services/menu-item-categories.service';
import { OrderService } from './services/order.service';
import { HelperService } from '../services/helper.service';

import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role.enum';

const routes: Routes = [
  { path: '', component: MenuDashboardComponent, pathMatch: 'full' },
  { path: 'menuItems', component: MenuItemsComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager]} },
  { path: 'menuItemCategories', component: MenuItemCategoriesComponent, canActivate: [AuthGuard], data: {roles: [Role.Manager]} },
  { path: 'placeOrder', component: PlaceOrderComponent, canActivate: [AuthGuard], data: {roles: [Role.Server, Role.Manager]} },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersComponent, canActivate: [AuthGuard], data: {roles: [Role.Server, Role.Manager]} },
      { path: ':id', component: ViewOrderComponent, canActivate: [AuthGuard], data: {roles: [Role.Server, Role.Manager]} },
    ]
  },
];

@NgModule({
  declarations: [
    // Container Components
    MenuDashboardComponent,
    MenuItemsComponent,
    MenuItemCategoriesComponent,
    OrdersComponent,
    PlaceOrderComponent,
    ViewOrderComponent,

    // Generic Components
    CategoryDetailComponent,
    CategoryFormComponent,
    CategoryFormModalContent,
    MenuItemDetailComponent,
    MenuItemFormComponent,
    MenuItemFormModalContent,
    MenuDetailComponent,
    OrderItemDetailComponent,
    OrderSummaryComponent
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
    MenuItemsService,
    MenuItemCategoriesService,
    OrderService,
    HelperService,
  ],
  entryComponents: [
    CategoryFormModalContent,
    MenuItemFormModalContent,
  ]
})
export class MenuDashboardModule {}
