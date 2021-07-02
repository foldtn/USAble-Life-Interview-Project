import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MenuItems } from '../../../models/menu-items.interface';
import { MenuItemCategories } from '../../../models/menu-item-categories.interface';
import { MenuItemOrderRequest } from '../../../models/menu-item-order-request.interface';

import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-order-item-detail',
  styleUrls: ['order-item-detail.component.css'],
  templateUrl: 'order-item-detail.component.html'
})
export class OrderItemDetailComponent implements OnInit {
  @Input()
  detail: MenuItems;

  @Input()
  categories: MenuItemCategories[];

  @Output()
  submit: EventEmitter<MenuItemOrderRequest> = new EventEmitter<MenuItemOrderRequest>();

  notIntegerError = false;

  menuItemOrderRequest: MenuItemOrderRequest =  {
    menuItem: undefined,
    quantity: 0
  };

  menuItemOrderDetailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
  ) {}

  ngOnInit() {
    this.menuItemOrderDetailForm = this.fb.group({
      Quantity: [
        '',
        [
          Validators.min(0),
        ]
      ]
    });
  }

  onQuantityChange() {
    const value = this.menuItemOrderDetailForm.value.Quantity;
    this.notIntegerError = (value !== undefined && value !== null) ? !Number.isInteger(value) : false;
  }

  onSubmit() {
    if (this.menuItemOrderDetailForm.valid) {
      this.menuItemOrderRequest.menuItem = this.detail;
      this.menuItemOrderRequest.quantity = this.menuItemOrderDetailForm.value.Quantity;
      this.submit.emit(this.menuItemOrderRequest);
    }
  }

  getCategoryText(value: number) {
    const menuItemCategory = this.getCategoryById(value);

    return menuItemCategory !== undefined ? menuItemCategory.Name : 'No Category';
  }

  getCategoryById(value: number) {
    if (this.categories !== undefined) {
      return this.categories.find((category: MenuItemCategories) => {
        if (category.Id === value) {
          return category.Name;
        }
      });
    }
  }

  getFormGroup(value: string) {
    return this.menuItemOrderDetailForm.get(value);
  }

  hasErrors(value: string) {
    return this.getFormGroup(value).invalid && this.getFormGroup(value).errors && (this.getFormGroup(value).dirty || this.getFormGroup(value).touched)
  }
}
