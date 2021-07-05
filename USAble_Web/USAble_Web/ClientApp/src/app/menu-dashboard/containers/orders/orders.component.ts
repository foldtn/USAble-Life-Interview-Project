import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderDto } from '../../models/order-dto/order-dto.interface';

import { OrderService } from '../../services/order.service';
import { ApiResponse } from '../../../models/api-response.interface';

@Component({
  selector: 'app-orders',
  styleUrls: ['orders.component.css'],
  template: `
    <div class="text-center">
      <h1>Orders</h1>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="col-sm-6 offset-3">
        <div class="card mt-4" *ngFor="let order of orders;">
          <div class="card-header">
            <div class="row">
              <div class="col-sm text-center">
                <h5>Ordered By: {{ order.UserFirstName }} {{ order.UserLastName }}</h5>
              </div>
              <div class="col-sm text-center">
                <h5>Ordered On: {{ order.CreatedDate | date : 'longDate' }} {{ order.CreatedDate | date : 'shortTime' }}</h5>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="col-sm-8 offset-sm-2">
              <div class="row">
                <div class="col-sm">
                  <h5>Sub-Total: {{ order.SubTotal | currency }}</h5>
                </div>
                <div class="col-sm">
                  <h5 *ngIf="order.Discount !== undefined && order.Discount !== null">
                    Discount Amount: {{ (order.Discount.DiscountType === 0) ? (order.Discount.Amount | currency) : (order.Discount.Amount + '%') }}
                  </h5>
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <h5>Pre-tax Total: {{ order.PreTaxTotal | currency }}</h5>
                </div>
                <div class="col-sm">
                  <h5>Tax Amount: {{ order.TotalTaxAmount }}%</h5>
                </div>
              </div>
              <h5>Total: {{ order.Total | currency }}</h5>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-success btn-lg" (click)="viewOrder(order.Id)">
                View Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: OrderDto[];

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {

    this.orderService
      .getOrders()
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          console.log(data.payload);
          this.orders = data.payload;
        }
        else {
          console.log(data.error);
        }
      })
  }

  viewOrder(id: number) {
    this.router.navigate(['/orders',id]);
  }
}
