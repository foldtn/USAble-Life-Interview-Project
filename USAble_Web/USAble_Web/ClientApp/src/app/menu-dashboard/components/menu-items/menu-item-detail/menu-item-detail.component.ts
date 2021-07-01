import {Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { MenuItems } from '../../../models/menu-items.interface';
import { MenuItemCategories } from '../../../models/menu-item-categories.interface';
import { ApiResponse } from '../../../../models/api-response.interface';

import { HelperService } from '../../../../services/helper.service';

@Component({
  selector: 'app-menu-item-detail',
  styleUrls: ['menu-item-detail.component.css'],
  templateUrl: 'menu-item-detail.component.html'
})
export class MenuItemDetailComponent implements OnChanges {
  @Input()
  detail: MenuItems;

  @Input()
  categories: MenuItemCategories[];

  @Input()
  response: ApiResponse;

  @Output()
  update: EventEmitter<MenuItems> = new EventEmitter<MenuItems>();

  @Output()
  delete: EventEmitter<MenuItems> = new EventEmitter<MenuItems>();

  editing: boolean = false;
  nameError: string;
  costError: string;
  tempName: string;
  tempCost: number;
  tempCategory: number;
  revertName: string;
  revertCost: number;
  revertCategory: number;
  failedAlertMessage: string;
  failedAlert: boolean = false;

  constructor(private helperService: HelperService,) {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
      this.tempName = this.detail.Name;
      this.tempCost = this.detail.Cost;
      this.tempCategory = this.detail.MenuItemCategoryId;
    }

    if (changes.response) {
      const response = Object.assign({}, changes.response.currentValue);
      if (response.success !== undefined) {
        if(response.success){
          if (this.tempName !== undefined) {
            this.detail.Name = this.tempName;
          }

          if (this.tempCost !== undefined) {
            this.detail.Cost = this.tempCost;
          }

          if (this.tempCategory !== undefined) {
            this.detail.MenuItemCategoryId = this.tempCategory
          }

          this.editing = false;
        } else if (response.payload.Id === this.detail.Id) {
          this.detail.Name = this.revertName;
          this.detail.Cost = this.revertCost;
          this.detail.MenuItemCategoryId = this.revertCategory;

          this.tempName = this.detail.Name;
          this.tempCost = this.detail.Cost;
          this.tempCategory = this.detail.MenuItemCategoryId;

          this.revertName = undefined;
          this.revertCost = undefined;
          this.revertCategory = undefined;

          this.editing = true;

          this.failedAlertMessage = response.error;
          this.failedAlert = true;
        }
      }
    }
  }

  onNameChange(value: string) {
    // check if name is already exists
    if (value === undefined || value === null || value === '') {
      this.nameError = 'Tax Name is Required';
    }
    else {
      this.tempName = value;
      this.nameError = undefined;
    }

    this.closeFailedAlert();
  }

  onCostChange(value: number) {
    // throw required validation error
    if (value === undefined || value === null) {
      this.costError = 'Tax Amount is Required'
    }
    // throw validation error if outside of 0 - 100 number range
    else if (value < 0.5 || 100 < value) {
      this.costError = 'Not within range (0.5-100)'
    }
    // throw validation error if a decimal
    else if (!this.helperService.hasTwoDecimals(value)) {
      this.costError = 'Only 2 decimal places allowed'
    }
    else {
      this.tempCost = value;
      this.costError = undefined;
    }

    this.closeFailedAlert();
  }

  onCategoryChange(value: any) {
    this.tempCategory = parseInt(value);

    this.closeFailedAlert();
  }

  onDelete() {
    this.delete.emit(this.detail);
  }

  undoChanges() {
    this.nameError = undefined;
    this.costError = undefined;
    this.revertName = undefined;
    this.revertCost = undefined;
    this.revertCategory = undefined;
    this.editing = false;

    this.closeFailedAlert();
  }

  toggleEdit() {
    if (this.editing) {
      if (this.tempName !== undefined) {
        this.revertName = this.detail.Name;
        this.detail.Name = this.tempName;
      }

      if (this.tempCost !== undefined) {
        this.revertCost = this.detail.Cost;
        this.detail.Cost = this.tempCost;
      }

      if (this.tempCost !== undefined) {
        this.revertCategory = this.detail.MenuItemCategoryId;
        this.detail.MenuItemCategoryId = this.tempCategory;
      }

      this.update.emit(this.detail);
    }

    this.editing = !this.editing;
  }

  closeFailedAlert() {
    this.failedAlert = false;
    this.failedAlertMessage = undefined;
  }

  disableSubmit() {
    return (this.nameError || this.costError) ||
      (this.tempName === this.detail.Name && this.tempCost === this.detail.Cost && this.tempCategory === this.detail.MenuItemCategoryId)
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
}
