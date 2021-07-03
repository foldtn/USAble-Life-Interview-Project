import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDto } from '../../../models/order-dto/order-dto.interface';

import { OrderService } from '../../../services/order.service';
import { ApiResponse } from '../../../../models/api-response.interface';
import { OrderMenuItemDto } from '../../../models/order-dto/order-menu-item-dto';

@Component({
  selector: 'app-view-order',
  styleUrls: ['view-order.component.css'],
  templateUrl: 'view-order.component.html'
})
export class ViewOrderComponent implements OnInit {
  orderId: number;
  order: OrderDto;

  constructor(
    private router: Router,
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

  getItemCost(orderItem: OrderMenuItemDto) {
    return orderItem.MenuItem.Cost * orderItem.Quantity;
  }

  goBack() {
    this.router.navigate(['/orders']);
  }
}
