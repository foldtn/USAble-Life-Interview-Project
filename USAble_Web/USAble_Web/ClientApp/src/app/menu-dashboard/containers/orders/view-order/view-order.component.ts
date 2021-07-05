import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiResponse } from '../../../../models/api-response.interface';
import { OrderDto } from '../../../models/order-dto/order-dto.interface';
import { OrderMenuItemDto } from '../../../models/order-dto/order-menu-item-dto';

import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-view-order',
  styleUrls: ['view-order.component.css'],
  templateUrl: 'view-order.component.html'
})
export class ViewOrderComponent implements OnInit {
  order: OrderDto;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService
      .getOrderById(orderId)
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
