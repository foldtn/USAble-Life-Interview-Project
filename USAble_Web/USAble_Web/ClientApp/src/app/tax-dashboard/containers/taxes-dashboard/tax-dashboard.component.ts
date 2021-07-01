import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaxDashboardService } from '../../tax-dashboard.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { Tax } from '../../models/tax.interface';
import { User } from '../../../models/user.interface';
import { ApiResponse } from '../../../models/api-response.interface';

@Component({
  selector: 'app-tax-dashboard',
  styleUrls: ['tax-dashboard.component.css'],
  template: `
    <div class="text-center">
      <h1>Taxes</h1>
    </div>
    <app-tax-form (create)="handleCreate($event)"></app-tax-form>
    <div class="col-sm-6 offset-sm-3 mt-2">
      <div *ngIf="successAlert" class="alert alert-success alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeSuccessAlert()">&times;</a>
        The tax was created successfully.
      </div>
      <div *ngIf="failedAlert" class="alert alert-danger alert-dismissible">
        <a class="close" data-dismiss="alert" aria-label="close" (click)="closeFailedAlert()">&times;</a>
        {{ failedMessage }}
      </div>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="row">
        <div class="col-sm-3 mt-4" *ngFor="let tax of taxes;">
          <app-tax-details
            [detail]="tax"
            [response]="taxResponse"
            (update)="handleUpdate($event)"
            (delete)="handleDelete($event)"
          >
          </app-tax-details>
        </div>
      </div>
    </div>
  `
})
export class TaxDashboardComponent implements OnInit {
  taxes: Tax[];
  currentUser: User;
  taxResponse: ApiResponse;
  failedAlert: boolean = false;
  failedMessage: string;
  successAlert: boolean = false;

  constructor(
    private router: Router,
    private taxService: TaxDashboardService,
    private authService: AuthenticationService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.taxService
      .getTaxes()
      .subscribe(((data: ApiResponse) => {
        if (data.success) {
          console.log(data.payload);
          this.taxes = data.payload;
        }
        else {
          console.log(data.error);
        }
      }));
  }

  handleCreate(event: Tax) {
    event.CreatedBy = this.currentUser.id;

    console.log(event);

    this.taxService.createTax(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        this.taxes.push(data.payload);
        this.successAlert = true;
      }
      else {
        console.log(data.error);
        this.failedMessage = data.error;
        this.failedAlert = true;
      }
    });
  }

  handleUpdate(event: Tax) {
    event.ModifiedBy = this.currentUser.id;

    this.taxService.updateTax(event).subscribe((data: ApiResponse) => {
      this.taxResponse = data;
      if (data.success) {
        // Update taxes array with updated information
        event.Id  = data.payload.Id;
        this.taxes = this.taxes.map((tax: Tax) => {
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

  handleDelete(event: Tax) {
    event.ModifiedBy = this.currentUser.id;

    this.taxService.deleteTax(event).subscribe((data: ApiResponse) => {
      if (data.success) {
        // Remove deleted item from taxes array
        this.taxes = this.taxes.filter((tax: Tax) => {
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
