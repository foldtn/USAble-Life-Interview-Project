import {Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from '../../../models/order.interface';

import { OrderService } from '../../../services/order.service';
import {ApiResponse} from '../../../../models/api-response.interface';

@Component({
  selector: 'app-view-order',
  styleUrls: ['view-order.component.css'],
  template: `
    <div>
      View Order {{orderId}}
    </div>
    <div>
      {{this.order | json}}
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
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService
      .getOrderById(this.orderId)
      .subscribe((data: ApiResponse) => {
        if (data.success) {
          this.order = data.payload;
        }
        else {
          console.log(data.error);
        }
      })
  }
}
