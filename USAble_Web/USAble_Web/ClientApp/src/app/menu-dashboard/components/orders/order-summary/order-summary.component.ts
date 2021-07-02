import {Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Order } from '../../../models/order.interface';
import { MenuItemOrderRequest } from '../../../models/menu-item-order-request.interface';
import { Discount } from '../../../../discount-dashboard/models/discount.interface';
import { Tax } from '../../../../tax-dashboard/models/tax.interface';
import { OrderRequest } from '../../../models/order-request.interface';

import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-order-summary',
  styleUrls: ['order-summary.component.css'],
  templateUrl: 'order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {
  @Input()
  orderItems: MenuItemOrderRequest[];

  @Input()
  discounts: Discount[];

  @Input()
  taxes: Tax[];

  @Output()
  submit: EventEmitter<OrderRequest> = new EventEmitter<OrderRequest>();

  oldOrderItems: MenuItemOrderRequest[];
  orderForm: FormGroup;
  selectedId: number;
  selectedName: string;
  selectedAmount: string;
  selectedFixed: boolean;
  subTotal: number = 0;
  preTaxTotal: number = 0;
  totalTaxAmount: number = 0;
  totalCost: number = 0;
  discountError: boolean = false;

  order: Order = new class implements Order {
    CreatedBy: number;
    CreatedDate: Date;
    DiscountId: number;
    Id: number;
    PreTaxTotal: number;
    SubTotal: number;
    Total: number;
    TotalTaxAmount: number;
  };

  orderRequest: OrderRequest = new class implements OrderRequest {
    menuItemRequests: MenuItemOrderRequest[];
    order: Order;
    taxes: Tax[];
  };

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      Discount: null
    });

    this.selectedName = 'No Discount Selected';

    this.orderForm.get('Discount').valueChanges.subscribe(data => {
      let discount: Discount;

      if (data !== undefined && data !== null) {
        discount = this.getDiscountById(parseInt(data));
        this.selectedId = parseInt(data);
        this.selectedName = (discount !== undefined) ? discount.Name : 'No Discount Selected';
        this.selectedAmount = (discount !== undefined) ? discount.Amount.toString() : undefined;
        this.selectedFixed = (discount !== undefined) ? discount.DiscountType === 0 : undefined;
      }

      this.calculateTotal();
    });
  }

  submitSummary() {
    //Assemble Order
    this.order.DiscountId = this.selectedId;
    this.order.SubTotal = this.subTotal;
    this.order.PreTaxTotal = this.preTaxTotal;
    this.order.TotalTaxAmount = this.totalTaxAmount;
    this.order.Total = this.totalCost;

    //Assembler Order request

    this.orderRequest.order = this.order;
    this.orderRequest.menuItemRequests = this.orderItems;
    this.orderRequest.taxes = this.taxes;

    this.submit.emit(this.orderRequest);
  }

  calculateTotal() : number {
    this.clearTotals();

    //Calculate Total Tax Amount
    if (this.taxes !== undefined && this.taxes.length !== 0) {
      this.taxes.forEach((tax: Tax) => {
        this.totalTaxAmount += tax.Amount;
      });
    }

    if (this.orderItems !== undefined && this.orderItems.length !== 0) {
      //Calculate sub total
      this.orderItems.forEach((item: MenuItemOrderRequest) => {
        this.subTotal += (item.menuItem.Cost * item.quantity);
      });

      //Calculate Pre-tax Total
      if (this.selectedAmount !== undefined && this.selectedFixed !== undefined) {
        const discountAmount = parseInt(this.selectedAmount);

        if (this.selectedFixed) {
          this.discountError = this.subTotal <= discountAmount;
          this.preTaxTotal = this.subTotal - discountAmount;
        } else {
          this.discountError = false;
          this.preTaxTotal = this.subTotal - (this.subTotal * (discountAmount / 100));
        }
      } else {
        this.preTaxTotal = this.subTotal;
      }

      //Calculate Total
      this.totalCost = this.preTaxTotal + (this.preTaxTotal / this.totalTaxAmount);
    }

    return this.totalCost;
  }

  clearTotals() {
    this.subTotal = 0;
    this.preTaxTotal = 0;
    this.totalTaxAmount = 0;
    this.totalCost = 0;
  }

  getItemCost(orderItem: MenuItemOrderRequest) {
    return orderItem.menuItem.Cost * orderItem.quantity;
  }

  getDiscountAmount(value: number) {
    const discount = this.getDiscountById(value);

    return discount !== undefined ? discount.Amount : '';
  }

  getDiscountById(value: number) {
    if (this.discounts !== undefined && value !== undefined) {
      return this.discounts.find((discount: Discount) => {
        if (discount.Id === value) {
          return discount.Name;
        }
      });
    }
  }

  canSubmit() : boolean {
    return this.orderItems !== undefined && this.orderItems.length !== 0;
  }
}
