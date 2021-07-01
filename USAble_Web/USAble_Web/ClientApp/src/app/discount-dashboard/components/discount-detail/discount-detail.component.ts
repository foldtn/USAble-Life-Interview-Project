import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Discount } from '../../models/discount.interface';
import { ApiResponse } from '../../../models/api-response.interface';

import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-discount-details',
  styleUrls: ['discount-detail.component.css'],
  templateUrl: 'discount-detail.component.html'
})
export class DiscountDetailComponent implements OnChanges {
  @Input()
  detail: Discount;

  @Input()
  response: ApiResponse;

  @Output()
  update: EventEmitter<Discount> = new EventEmitter<Discount>();

  @Output()
  delete: EventEmitter<Discount> = new EventEmitter<Discount>();

  editing: boolean = false;
  discountNameError: string;
  discountAmountError: string;
  tempName: string;
  tempAmount: number;
  tempDiscountType: number;
  revertName: string;
  revertAmount: number;
  revertDiscountType: number;
  failedAlertMessage: string;
  failedAlert: boolean = false;

  constructor(private helperService: HelperService) {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
      this.tempName = this.detail.Name;
      this.tempAmount = this.detail.Amount;
      this.tempDiscountType = this.detail.DiscountType;
    }

    if (changes.response) {
      const response = Object.assign({}, changes.response.currentValue);
      if (response.success !== undefined) {
        if(response.success && response.payload.Id === this.detail.Id){
          if (this.tempName !== undefined) {
            this.detail.Name = this.tempName;
          }

          if (this.tempAmount !== undefined) {
            this.detail.Amount = this.tempAmount;
          }

          if (this.tempDiscountType !== undefined) {
            this.detail.DiscountType = this.tempDiscountType;
          }

          this.editing = false;
        } else if (response.payload.Id === this.detail.Id) {
          this.detail.Name = this.revertName;
          this.detail.Amount = this.revertAmount;
          this.detail.DiscountType = this.revertDiscountType;

          this.tempName = this.detail.Name;
          this.tempAmount = this.detail.Amount;
          this.tempDiscountType = this.detail.DiscountType;

          this.revertName = undefined;
          this.revertAmount = undefined;
          this.revertDiscountType = undefined;

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
      this.discountNameError = 'Discount Name is Required';
    }
    else {
      this.tempName = value;
      this.discountNameError = undefined;
    }

    this.closeFailedAlert();
  }

  onAmountChange(value: number) {
    // throw required validation error
    if (value === undefined || value === null) {
      this.discountAmountError = 'Discount Amount is Required'
    }
    // throw validation error if outside of 0 - 100 number range
    else if (value < 0.5 || 100 < value) {
      this.discountAmountError = 'Not within range (0.5-100)'
    }
    // throw validation error if a decimal
    else if (!this.helperService.hasTwoDecimals(value)) {
      this.discountAmountError = 'Only 2 decimal places allowed'
    }
    else {
      this.tempAmount = value;
      this.discountAmountError = undefined;
    }

    this.closeFailedAlert();
  }

  onDiscountTypeChange(event: any) {
    this.tempDiscountType = parseInt(event.target.value);

    this.closeFailedAlert();
  }

  onDelete() {
    this.delete.emit(this.detail);
  }

  undoChanges() {
    this.discountNameError = undefined;
    this.discountAmountError = undefined;
    this.revertName = undefined;
    this.revertAmount = undefined;
    this.revertDiscountType = undefined;
    this.editing = false;

    this.closeFailedAlert();
  }

  toggleEdit() {
    if (this.editing) {
      if (this.tempName !== undefined) {
        this.revertName = this.detail.Name;
        this.detail.Name = this.tempName;
      }

      if (this.tempAmount !== undefined) {
        this.revertAmount = this.detail.Amount;
        this.detail.Amount = this.tempAmount;
      }

      if (this.tempDiscountType !== undefined) {
        this.revertDiscountType = this.detail.DiscountType;
        this.detail.DiscountType = this.tempDiscountType
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
    return (this.discountNameError || this.discountAmountError) ||
      (this.tempName === this.detail.Name && this.tempAmount === this.detail.Amount && this.tempDiscountType === this.detail.DiscountType)
  }
}
