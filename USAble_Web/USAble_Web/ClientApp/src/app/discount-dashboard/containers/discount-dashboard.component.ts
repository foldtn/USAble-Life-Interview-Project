import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DiscountDashboardService } from '../discount-dashboard.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Discount } from '../models/discount.interface';
import { User } from '../../models/user.interface';
import { ApiResponse } from '../../models/api-response.interface';

@Component({
  selector: 'app-discount-dashboard',
  styleUrls: ['discount-dashboard.component.css'],
  template: `
    <div class="text-center">
      <h1>Discounts</h1>
    </div>
    <app-discount-form (create)="handleCreate($event)"></app-discount-form>
    <div class="col-sm-6 offset-sm-3 mt-2">
      <div *ngIf="successAlert" class="alert alert-success alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeSuccessAlert()">&times;</a>
        The discount was created successfully.
      </div>
      <div *ngIf="failedAlert" class="alert alert-danger alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeFailedAlert()">&times;</a>
        {{ failedMessage }}
      </div>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="row">
        <div class="col-sm-3 mt-4" *ngFor="let discount of discounts;">
          <app-discount-details
            [detail]="discount"
            [response]="discountResponse"
            (update)="handleUpdate($event)"
            (delete)="handleDelete($event)"
          >
          </app-discount-details>
        </div>
      </div>
    </div>
  `
})
export class DiscountDashboardComponent implements OnInit {
  discounts: Discount[];
  currentUser: User;
  discountResponse: ApiResponse;
  failedAlert: boolean = false;
  failedMessage: string;
  successAlert: boolean = false;

  constructor(
    private router: Router,
    private discountService: DiscountDashboardService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.discountService
      .getDiscounts()
      .subscribe(((data: ApiResponse) => {
        if (data.success) {
          console.log(data.payload);
          this.discounts = data.payload;
        }
        else {
          console.log(data.error);
        }
      }));
  }

  handleCreate(event: Discount) {
    event.CreatedBy = this.currentUser.id;

    console.log(event);

    this.discountService.createDiscount(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        this.discounts.push(data.payload);
        this.successAlert = true;
      }
      else {
        console.log(data.error);
        this.failedMessage = data.error;
        this.failedAlert = true;
      }
    });
  }

  handleUpdate(event: Discount) {
    event.ModifiedBy = this.currentUser.id;

    this.discountService.updateDiscount(event).subscribe((data: ApiResponse) => {
      this.discountResponse = data;
      if (data.success) {
        // Update taxes array with updated information
        event.Id  = data.payload.Id;
        this.discounts = this.discounts.map((tax: Discount) => {
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

  handleDelete(event: Discount) {
    event.ModifiedBy = this.currentUser.id;

    this.discountService.deleteDiscount(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        // Remove deleted item from taxes array
        this.discounts = this.discounts.filter((tax: Discount) => {
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
