import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TaxDashboardService } from '../../tax-dashboard.service';

import { Tax } from '../../models/tax.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tax-dashboard',
  styleUrls: ['tax-dashboard.component.css'],
  template: `
    <div>
      <app-tax-details
        [detail]="tax">
      </app-tax-details>
      {{ test }}
    </div>
  `
})
export class TaxDashboardComponent implements OnInit {
  tax: Tax;
  test: string;

  constructor(
    private router: Router,
    private taxService: TaxDashboardService
  ) {}

  ngOnInit() {
    this.taxService
      .getTaxById(1)
      .subscribe(((data: any) => {
        this.tax = data.data;
        this.test = "HELLO";
      }));
  }

}
