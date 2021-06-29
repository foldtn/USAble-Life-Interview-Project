import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TaxDashboardService } from '../../tax-dashboard.service';
import { AuthenticationService } from '../../../services/authentication.service';

import { Tax } from '../../models/tax.interface';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-tax-dashboard',
  styleUrls: ['tax-dashboard.component.css'],
  template: `
    <div>
      <div class="text-center">
        <h3>Taxes</h3>
      </div>
      <app-tax-form (create)="handleCreate($event)"></app-tax-form>
      <app-tax-details
        *ngFor="let tax of taxes;"
        [detail]="tax"
        (update)="handleUpdate($event)"
        (delete)="handleDelete($event)"
      >
      </app-tax-details>
    </div>
  `
})
export class TaxDashboardComponent implements OnInit {
  taxes: Tax[];
  currentUser: User;

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
      .subscribe(((data: Tax[]) => {
        console.log(data);
        this.taxes = data;
      }));
  }

  handleCreate(event: Tax) {
    event.CreatedBy = this.currentUser.id;

    console.log(event);

    this.taxService.createTax(event).subscribe((data: Tax) => {
      this.taxes.push(data);
    });
  }

  handleUpdate(event: Tax) {
    event.ModifiedBy = this.currentUser.id;

    this.taxService.updateTax(event).subscribe((data: Tax) => {
      // Update taxes array with updated information
      this.taxes = this.taxes.map((tax: Tax) => {
        if (tax.Name === event.Name) {
          tax = Object.assign({}, tax, event);
        }

        return tax;
      });
    });
  }

  handleDelete(event: Tax) {
    event.ModifiedBy = this.currentUser.id;

    this.taxService.deleteTax(event).subscribe((data: any) => {
      // Remove deleted item from taxes array
      this.taxes = this.taxes.filter((tax: Tax) => {
        return tax.Id !== event.Id;
      });
    })
  }
}
