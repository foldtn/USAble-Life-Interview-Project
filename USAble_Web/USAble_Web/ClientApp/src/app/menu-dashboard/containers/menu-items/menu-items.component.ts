import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItemsService } from '../../services/menu-items.service';
import { MenuItemCategoriesService } from '../../services/menu-item-categories.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { MenuItems } from '../../models/menu-items.interface';
import { User } from '../../../models/user.interface';
import { ApiResponse } from '../../../models/api-response.interface';
import { MenuItemCategories } from '../../models/menu-item-categories.interface';

@Component({
  selector: 'app-menu-items',
  styleUrls: ['menu-items.component.css'],
  template: `
    <div class="text-center">
      <h1>Menu Items</h1>
    </div>
    <app-menu-item-form (create)="handleCreate($event)"></app-menu-item-form>
    <div class="col-sm-6 offset-sm-3 mt-2">
      <div *ngIf="successAlert" class="alert alert-success alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeSuccessAlert()">&times;</a>
        The menu item was created successfully.
      </div>
      <div *ngIf="failedAlert" class="alert alert-danger alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeFailedAlert()">&times;</a>
        {{ failedMessage }}
      </div>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="row">
        <div class="col-sm-3 mt-4" *ngFor="let menuItem of menuItems;">
          <app-menu-item-detail
            [detail]="menuItem"
            [response]="menuItemResponse"
            [categories]="categories"
            (update)="handleUpdate($event)"
            (delete)="handleDelete($event)"
          >
          </app-menu-item-detail>
        </div>
      </div>
    </div>
  `
})
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItems[];
  categories: MenuItemCategories[];
  currentUser: User;
  menuItemResponse: ApiResponse;
  failedAlert: boolean = false;
  failedMessage: string;
  successAlert: boolean = false;

  constructor(
    private router: Router,
    private menuItemService: MenuItemsService,
    private categoryService: MenuItemCategoriesService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.menuItemService
      .getMenuItems()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.menuItems = data.payload;
        }
        else {
          console.log(data.error);
        }
      });

    this.categoryService
      .getCategories()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.categories = data.payload;
        }
        else {
          console.log(data.error);
        }
      });

  }

  handleCreate(event: MenuItems) {
    event.CreatedBy = this.currentUser.id;

    console.log(event);

    this.menuItemService.createMenuItem(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        this.menuItems.push(data.payload);
        this.successAlert = true;
      }
      else {
        console.log(data.error);
        this.failedMessage = data.error;
        this.failedAlert = true;
      }
    });
  }

  handleUpdate(event: MenuItems) {
    event.ModifiedBy = this.currentUser.id;

    this.menuItemService.updateMenuItem(event).subscribe((data: ApiResponse) => {
      this.menuItemResponse = data;
      if (data.success) {
        // Update taxes array with updated information
        event.Id  = data.payload.Id;
        this.menuItems = this.menuItems.map((tax: MenuItems) => {
          if (tax.Name === event.Name) {
            tax = Object.assign({}, tax, event);
          }

          return tax;
        });
      }
      else {
        console.log(data.error);
      }
    });
  }

  handleDelete(event: MenuItems) {
    event.ModifiedBy = this.currentUser.id;

    this.menuItemService.deleteMenuItem(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        // Remove deleted item from taxes array
        this.menuItems = this.menuItems.filter((tax: MenuItems) => {
          return tax.Id !== event.Id;
        });
      }
      else {
        console.log(data.error);
      }
    })
  }

  closeSuccessAlert() {
    this.successAlert = false;
  }

  closeFailedAlert() {
    this.failedAlert = false;
  }
}
