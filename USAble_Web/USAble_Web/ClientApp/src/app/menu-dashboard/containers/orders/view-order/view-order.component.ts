import {Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';



import { Order } from '../../../models/order.interface';

import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-view-order',
  styleUrls: ['view-order.component.css'],
  template: `
    <div>
      View Order
    </div>
  `
})
export class ViewOrderComponent implements OnInit {
  orderId: number;
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((data: Order) => this.orderService.getOrderById(data.Id))
      .subscribe((data: Order) => this.order = data);
  }
}
