import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { Tax } from '../../models/tax.interface';
import { ApiResponse } from '../../../models/api-response.interface';

import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-tax-details',
  styleUrls: ['tax-detail.component.css'],
  templateUrl: 'tax-detail.component.html'
})
export class TaxDetailComponent implements OnChanges {
  @Input()
  detail: Tax;

  @Input()
  response: ApiResponse;

  @Output()
  update: EventEmitter<Tax> = new EventEmitter<Tax>();

  @Output()
  delete: EventEmitter<Tax> = new EventEmitter<Tax>();

  editing: boolean = false;
  nameError: string;
  amountError: string;
  tempName: string;
  tempAmount: number;
  revertName: string;
  revertAmount: number;
  failedAlertMessage: string;
  failedAlert: boolean = false;

  constructor(private helperService: HelperService) {}

  ngOnChanges(changes) {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
      this.tempName = this.detail.Name;
      this.tempAmount = this.detail.Amount;
    }

    if (changes.response) {
      const response = Object.assign({}, changes.response.currentValue);
      if (response.success !== undefined) {
        if(response.success){
          if (this.tempName !== undefined) {
            this.detail.Name = this.tempName;
          }

          if (this.tempAmount !== undefined) {
            this.detail.Amount = this.tempAmount;
          }
          this.editing = false;
        } else if (response.payload.Id === this.detail.Id) {
          this.detail.Name = this.revertName;
          this.detail.Amount = this.revertAmount;

          this.tempName = this.detail.Name;
          this.tempAmount = this.detail.Amount;

          this.revertName = undefined;
          this.revertAmount = undefined;

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

  onAmountChange(value: number) {
    // throw required validation error
    if (value === undefined || value === null) {
      this.amountError = 'Tax Amount is Required'
    }
    // throw validation error if outside of 0 - 100 number range
    else if (value < 1 || 100 < value) {
      this.amountError = 'Not within range (1-100)'
    }
    // throw validation error if a decimal
    else if (!this.helperService.hasTwoDecimals(value)) {
      this.amountError = 'Only 2 decimal places allowed'
    }
    else {
      this.tempAmount = value;
      this.amountError = undefined;
    }

    this.closeFailedAlert();
  }

  onDelete() {
    this.delete.emit(this.detail);
  }

  undoChanges() {
    this.nameError = undefined;
    this.amountError = undefined;
    this.revertName = undefined;
    this.revertAmount = undefined;
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

      this.update.emit(this.detail);
    }

    this.editing = !this.editing;
  }

  closeFailedAlert() {
    this.failedAlert = false;
    this.failedAlertMessage = undefined;
  }

  disableSubmit() {
    return (this.nameError || this.amountError) ||
      (this.tempName === this.detail.Name && this.tempAmount === this.detail.Amount)
  }
}
