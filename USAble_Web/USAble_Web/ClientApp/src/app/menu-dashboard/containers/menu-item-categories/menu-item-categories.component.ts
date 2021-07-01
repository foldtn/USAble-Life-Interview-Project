import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItemCategoriesService } from '../../services/menu-item-categories.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { MenuItemCategories } from '../../models/menu-item-categories.interface';
import { User } from '../../../models/user.interface';
import { ApiResponse } from '../../../models/api-response.interface';

@Component({
  selector: 'app-menu-item-categories',
  styleUrls: ['menu-item-categories.component.css'],
  template: `
    <div class="text-center">
      <h1>Menu Item Categories</h1>
    </div>
    <app-category-form (create)="handleCreate($event)"></app-category-form>
    <div class="col-sm-6 offset-sm-3 mt-2">
      <div *ngIf="successAlert" class="alert alert-success alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeSuccessAlert()">&times;</a>
        The category was created successfully.
      </div>
      <div *ngIf="failedAlert" class="alert alert-danger alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeFailedAlert()">&times;</a>
        {{ failedMessage }}
      </div>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="row">
        <div class="col-sm-3 mt-4" *ngFor="let category of categories;">
          <app-category-detail
            [detail]="category"
            [response]="categoryResponse"
            (update)="handleUpdate($event)"
            (delete)="handleDelete($event)"
          >
          </app-category-detail>
        </div>
      </div>
    </div>
  `
})
export class MenuItemCategoriesComponent implements OnInit {
  categories: MenuItemCategories[];
  currentUser: User;
  categoryResponse: ApiResponse;
  failedAlert: boolean = false;
  failedMessage: string;
  successAlert: boolean = false;

  constructor(
    private router: Router,
    private categoryService: MenuItemCategoriesService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe(((data: ApiResponse) => {
        if (data.success) {
          console.log(data.payload);
          this.categories = data.payload;
        }
        else {
          console.log(data.error);
        }
      }));
  }

  handleCreate(event: MenuItemCategories) {
    event.CreatedBy = this.currentUser.id;

    console.log(event);

    this.categoryService.createCategory(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        this.categories.push(data.payload);
        this.successAlert = true;
      }
      else {
        console.log(data.error);
        this.failedMessage = data.error;
        this.failedAlert = true;
      }
    });
  }

  handleUpdate(event: MenuItemCategories) {
    event.ModifiedBy = this.currentUser.id;

    this.categoryService.updateCategory(event).subscribe((data: ApiResponse) => {
      this.categoryResponse = data;
      if (data.success) {
        // Update taxes array with updated information
        event.Id  = data.payload.Id;
        this.categories = this.categories.map((tax: MenuItemCategories) => {
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

  handleDelete(event: MenuItemCategories) {
    event.ModifiedBy = this.currentUser.id;

    this.categoryService.deleteCategory(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        // Remove deleted item from taxes array
        this.categories = this.categories.filter((category: MenuItemCategories) => {
          return category.Id !== event.Id;
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
