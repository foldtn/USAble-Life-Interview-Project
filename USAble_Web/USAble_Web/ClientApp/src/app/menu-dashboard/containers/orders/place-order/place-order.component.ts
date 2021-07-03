import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../models/user.interface';
import { MenuItems } from '../../../models/menu-items.interface';
import { MenuItemCategories } from '../../../models/menu-item-categories.interface';
import { Tax } from '../../../../tax-dashboard/models/tax.interface';
import { Discount } from '../../../../discount-dashboard/models/discount.interface';
import { ApiResponse } from '../../../../models/api-response.interface';
import { MenuItemOrderRequest } from '../../../models/menu-item-order-request.interface';
import { OrderRequest } from '../../../models/order-request.interface';

import { MenuItemsService } from '../../../services/menu-items.service';
import { MenuItemCategoriesService } from '../../../services/menu-item-categories.service';
import { TaxDashboardService } from '../../../../tax-dashboard/tax-dashboard.service';
import { DiscountDashboardService } from '../../../../discount-dashboard/discount-dashboard.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-place-order',
  styleUrls: ['place-order.component.css'],
  template: `
    <div class="text-center">
      <h1>Place Order</h1>
    </div>
    <div *ngIf="failedAlert" class="alert alert-danger alert-dismissible">
      <a class="close" data-dismiss="alert" aria-label="close" (click)="closeFailedAlert()">&times;</a>
      {{ failedMessage }}
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="row">
        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-4 mb-4" *ngFor="let menuItem of menuItems;">
              <app-order-item-detail
                [detail]="menuItem"
                [categories]="categories"
                (submit)="handleOrderItemSubmit($event)"
              >
              </app-order-item-detail>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <app-order-summary
              [orderItems]="currentMenuItems"
              [discounts]="discounts"
              [taxes]="taxes"
              (submit)="handleSummarySubmit($event)"
            >
            </app-order-summary>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PlaceOrderComponent implements OnInit {
  currentUser: User;

  menuItems: MenuItems[];
  categories: MenuItemCategories[];
  taxes: Tax[];
  discounts: Discount[];

  currentMenuItems: MenuItemOrderRequest[] = [];

  failedAlert: boolean = false;
  failedMessage: string;

  constructor(
    private menuItemService: MenuItemsService,
    private categoryService: MenuItemCategoriesService,
    private taxService: TaxDashboardService,
    private discountService: DiscountDashboardService,
    private authService: AuthenticationService,
    private orderService: OrderService,
    private router: Router,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.getCategories();
    this.getDiscounts();
    this.getTaxes();
    this.getMenuItems();
  }

  handleOrderItemSubmit(event: MenuItemOrderRequest) {
    if (event !== undefined && event.quantity !== undefined && event.menuItem !== undefined) {
      const tempItems = this.currentMenuItems;
      this.currentMenuItems = [];
      this.currentMenuItems = tempItems;
      if (event.quantity === null || event.quantity === 0 || event.quantity.toString() === '') {
        this.removeMenuItem(event);
      } else if (this.alreadyAddedCheck(event.menuItem.Id)) {
        this.updateMenuItem(event);
      } else {
        this.addMenuItem(event);
      }
    }

  }

  addMenuItem(event: MenuItemOrderRequest) {
    this.currentMenuItems.push(event);
  }

  updateMenuItem(event: MenuItemOrderRequest) {
    this.currentMenuItems = this.currentMenuItems.map((item: MenuItemOrderRequest) => {
      if (item.menuItem.Id === event.menuItem.Id) {
        item = Object.assign({}, item, event);
      }

      return item;
    });
  }

  removeMenuItem(event: MenuItemOrderRequest) {
    this.currentMenuItems = this.currentMenuItems.filter((item: MenuItemOrderRequest) => {
      return item.menuItem.Id !== event.menuItem.Id
    });
  }

  handleSummarySubmit(event: OrderRequest) {
    event.order.CreatedBy = this.currentUser.id;
    this.orderService.createOrder(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        // redirect to view order : ID using payload ID
        this.router.navigate(['/orders',data.payload]);
      }
      else {
        this.failedMessage = data.error;
        this.failedAlert = true;
      }
    });
  }

  alreadyAddedCheck(value: number) : boolean {
    let menuItemExists: MenuItemOrderRequest;

    if (this.currentMenuItems !== undefined && this.currentMenuItems.length !== 0) {
      menuItemExists = this.currentMenuItems.find((menuItem: MenuItemOrderRequest) => {
        if (menuItem.menuItem.Id === value) {
          return menuItem;
        }
      });
    }

    return !!(menuItemExists)
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.categories = data.payload;
        }
        else {
          console.log(data.error);
        }
      })
  }

  getDiscounts() {
    this.discountService
      .getDiscounts()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.discounts = data.payload;
        }
        else {
          console.log(data.error);
        }
      })
  }

  getTaxes() {
    this.taxService
      .getTaxes()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.taxes = data.payload;
        }
        else {
          console.log(data.error);
        }
      })
  }

  getMenuItems() {
    this.menuItemService
      .getMenuItems()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.menuItems = data.payload;
        }
        else {
          console.log(data.error);
        }
      })
  }
}
