import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderDto } from '../../models/order-dto/order-dto.interface';

import { OrderService } from '../../services/order.service';
import {ApiResponse} from '../../../models/api-response.interface';

@Component({
  selector: 'app-orders',
  styleUrls: ['orders.component.css'],
  template: `
    <div class="text-center">
      <h1>Orders</h1>
    </div>
    <div class="col-md-10 offset-md-1 mt-4">
      <div class="col-sm-6 offset-sm-3 mt-4 card" *ngFor="let order of orders;">
        <div class="mt-2 d-flex justify-content-center">
          <h5>Ordered By: {{ order.UserFirstName }} {{ order.UserLastName }}</h5>
        </div>
        <div class="mt-2 d-flex justify-content-center">
          <h5>Ordered On: {{ order.CreatedDate | date : 'longDate' }} {{ order.CreatedDate | date : 'shortTime' }}</h5>
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <h5>Total: {{ order.Total | currency }}</h5>
        </div>
        <div class="col-sm-4 offset-sm-4 mt-4 mb-4">
          <button type="button" class="btn btn-success btn-block" (click)="viewOrder(order.Id)">
            View Order
          </button>
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
